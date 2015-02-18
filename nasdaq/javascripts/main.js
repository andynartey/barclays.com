// CREATE BARCLAYS NAMESPACE
var BAR = BAR || {};

// quietly dispose of console errors in IE
if (typeof console === 'undefined') {
    var console = {
        log: function () {}
    };
}

$(function(){

    $(document)
        .foundation('forms')
        .foundation('tooltips');

    // Remove inline styling
    $.fn.removeStyle = function(style) {
        var search = new RegExp(style + '[^;]+;?', 'g');

        return this.each(function() {
            $(this).attr('style', function(i, style) {
                return style.replace(search, '');
            });
        });
    };

    // Set globals
    var isIE8 = $('html').hasClass('lt-ie9'),
        $document = $(document),
        $window = $(window),
        viewport = 0; // 0 mobile, 1 tablet, 2 desktop


    // ====================================================
    // MEGA MENU
    // ====================================================
    var $megaLink = $('[data-mega-top-link]'),
        $megaLinksItem = $('[data-mega-links-item]'),
        $menuPromo = $('[data-mega-promo]'),
        $megaCloseBtn = $('[data-mega-close]'),
        $megaMenuList = $('[data-mega-menu-list]');

    var megaMenu = {

        init: function() {
            $megaLink.on('click', this.checkState);

            // change here to prevent flicker of promo during hover
            // $megaLinksItem.hover(function () {
            //     megaMenu.hoverOpenThirdLevel($(this));
            // }, function () {
            //     megaMenu.hoverCloseThirdLevel($(this));
            // });
            $megaLinksItem.hoverIntent({
                over: this.hoverOpenThirdLevel,
                out: this.hoverCloseThirdLevel,
                timeout: 100
            });

            $megaCloseBtn.on('click', this.checkState);
        },

        checkState: function(e) {
            var $selector = $(this),
                openItems = $('.mega-active');

            if ( $selector.hasClass('mega-active') ) {
                megaMenu.closeMega(openItems);
            } else {
                megaMenu.closeMega(openItems);
                megaMenu.openMega($selector);
            }

            e.preventDefault();
        },

        openMega: function($selector) {
            var windowWidth = $(window).width(),
                siteWidth = $('.top-nav-bar > .row').width(),
                leftPos = (windowWidth - siteWidth) / 2;

            $selector.parent().addClass('active');

            $selector.next('[data-mega-content]').show()
                .addClass('js-mega-menu-open')
                .css('width', windowWidth)
                .css('left', -leftPos);

            $selector.addClass('mega-active');

            megaMenu.addHoverTopLevel();
            megaMenu.outsideClickClose($selector);

        },

        closeMega: function($selector) {
            $selector.parent().removeClass('active');
            $selector.next('[data-mega-content]').hide().removeClass('js-mega-menu-open');
            $selector.removeClass('mega-active');
            $(document).off('mouseup');
            $megaMenuList.unbind('mouseenter').unbind('mouseleave');
            $megaMenuList.removeProp('hoverIntent_t');
            $megaMenuList.removeProp('hoverIntent_s');
        },


        outsideClickClose: function($selector) {

            $(document).on('mouseup', function(e) {
                var navContainer = $('.main-nav');

                if ( !navContainer.is(e.target) && navContainer.has(e.target).length === 0 ) {
                    megaMenu.closeMega($selector);
                }
            });
        },

        addHoverTopLevel: function() {

            $megaMenuList.hoverIntent({
                over: this.checkMegaState,
                out: this.doNothing,
                selector: '[data-mega-top-link]',
                timeout: 0,
                interval: 0
            });

        },

        checkMegaState: function() {
            var $selector = $(this),
                openItems = $('.mega-active');

            if ( $selector.hasClass('mega-active') ) {
                megaMenu.closeMega(openItems);
            } else {
                megaMenu.closeMega(openItems);
                megaMenu.openMega($selector);
            }

        },

        doNothing: function() {
            return;
        },

        hoverOpenThirdLevel: function() {
            var $selector = $(this),
                $self = $selector.find('[data-mega-third-level-list]'),
                $localMegaLinks = $selector.closest('[data-mega-links]'),
                localMegaLinksWidth = $localMegaLinks.width(),
                localMegaLinksHeight = $localMegaLinks.height();

            $self.show()
                .css('width', localMegaLinksWidth+1)
                .css('min-height', localMegaLinksHeight-28);

            // $menuPromo.hide();

            if ( $self.height() > localMegaLinksHeight ) {
                $localMegaLinks.css({ 'height': $self.height() + 90 });
            }
        },

        hoverCloseThirdLevel: function() {
            var $selector = $(this),
                $self = $selector.find('[data-mega-third-level-list]'),
                $localMegaLinks = $selector.closest('[data-mega-links]');
            $self.hide();
            // $menuPromo.show();

            var attr = $localMegaLinks.attr('style');
            if ( typeof attr !== 'undefined' ) {
                $localMegaLinks.removeStyle('height');
            }
        }
    };


    // ====================================================
    // MOBILE HAMBURGER MENU
    // ====================================================
    var $siteContainer = $('.site-container'),
        $offcanvasMenuHolder = $('[data-offcanvas-menu-left]'),
        $offCanvasContentLayer = $('[data-offcanvas-menu-content-layer]'),
        $offCanvasMenuTopLevel = $('[data-offcanvas-menu-top-level]');

    var offCanvasMenu = {
        init: function() {
            $('[data-offcanvas-menu-toggle]').on('click', function(e) {

                if ( $siteContainer.hasClass('offcanvas-menu-open') ) {
                    offCanvasMenu.closeMenu();
                } else {
                    offCanvasMenu.openMenu();
                }

                e.preventDefault();
            });
        },

        openMenu: function() {
            var contentWidth = $siteContainer.width(),
                offCanvasMenuWidth = $offcanvasMenuHolder.width(),
                windowHeight = $('body').height();

            $offcanvasMenuHolder.css('height', windowHeight);

            $siteContainer.css('width', contentWidth);

            $offCanvasContentLayer.show();
            offCanvasMenu.closeLayer();

            $siteContainer.on('touchmove', function(e) {
                e.preventDefault();
            });  // disable scrolling on mobile devices

            $siteContainer.transition({
                "margin-left": offCanvasMenuWidth }, 250 )
                .addClass('offcanvas-menu-open');

            if ( $logoBanner.hasClass('banner-sticky') ) {
                $logoBanner.transition({
                    "left": offCanvasMenuWidth
                }, 250 );
            }
        },

        closeMenu: function() {
            $siteContainer.off('touchmove');
            $offcanvasMenuHolder.css('height', 'auto');

            $siteContainer.transition({ "margin-left": 0 }, 250);

            $siteContainer.css('width', 'auto').removeClass('offcanvas-menu-open');
            $siteContainer.removeStyle('width').removeStyle('margin-left');

            $offCanvasContentLayer.off('click');
            $offCanvasContentLayer.hide();

            if ( $logoBanner.hasClass('banner-sticky') ) {
                $logoBanner.transition({ "left": 0 }, 250 );
            }
        },

        closeLayer: function() {
            $offCanvasContentLayer.on('click', offCanvasMenu.closeMenu);
        }
    };

    var offCanvasMenuNestedLevels = {

        init: function() {
            $('[data-offcanvas-menu-second-link]').on('click', this.showSecondLevel);
            $('[data-offcanvas-menu-third-link]').on('click', this.showThirdLevel);
            $('[data-offcanvas-menu-second-back]').on('click', this.hideSecondLevel);
            $('[data-offcanvas-menu-third-back]').on('click', this.hideThirdLevel);
        },

        showSecondLevel: function(e) {
            var offCanvasMenuWidth = $offcanvasMenuHolder.width(),
                windowHeight = $('body').height();

            $(this).next('[data-offcanvas-menu-second-level]')
                .addClass('second-level-active')
                .css('height', windowHeight);

            $offCanvasMenuTopLevel
                .transition({
                    left: -offCanvasMenuWidth
                }, 250);

            e.preventDefault();
        },

        hideSecondLevel: function(e) {

            $self = $(this);

            $offCanvasMenuTopLevel
                .transition({
                    left: 0
                }, 250, function() {
                    $('.second-level-active')
                        .removeStyle('height')
                        .removeStyle('left')
                        .removeClass('second-level-active');
                });

            e.preventDefault();
        },

        showThirdLevel: function(e) {
            var offCanvasMenuWidth = $offcanvasMenuHolder.width(),
                windowHeight = $('body').height();

            $(this).next('[data-offcanvas-menu-third-level]')
                .addClass('third-level-active')
                .css('height', windowHeight);

            $('[data-offcanvas-menu-second-level]')
                .transition({
                    left: -offCanvasMenuWidth
                }, 250);

            e.preventDefault();
        },

        hideThirdLevel: function(e) {
            var $self = $(this);

            $self.closest('.second-level-active')
                .transition({
                    left: '100%'
                }, 250, function() {
                    $self.parent('.third-level-active')
                        .removeClass('third-level-active')
                        .removeStyle('height')
                        .removeStyle('left');
                });

            e.preventDefault();
        }
    };



    // ====================================================
    // HEADER SEARCH FIELD
    // ====================================================
    var $searchContainer = $('[data-search]'),
        $searchBtn = $('[data-search-toggle]'),
        $searchForm = $('[data-search-form]'),
        $searchField = $('[data-search-field]');

    var headerSearchField = {

        init: function() {

            enquire
                .register( "screen and (max-width: 768px)", {
                    match: function() {
                        $searchContainer.addClass('search-mobile');
                    },

                    unmatch: function() {
                        $searchContainer.removeClass('search-mobile');
                    }
                })
                .register( "screen and (min-width: 769px)", {
                    match: function() {
                        $searchContainer.addClass('search-desktop');

                        if ( $searchForm.attr('style') ) {
                            $searchForm.removeStyle('width');
                        }
                    },

                    unmatch: function() {
                        $searchContainer.removeClass('search-desktop');
                    }
                }, true);

            $searchBtn.on('click', this.showField);
            this.clearBtn();
            this.addSearchBtnIcon();
        },

        addSearchBtnIcon: function() {
            var searchIconCode = '<i class="icon icon__search"></i>';
            $searchForm.append(searchIconCode);
        },

        clearBtn: function() {
            var clearIconCode = '<i class="icon icon__clear search-clear"></i>';
            $searchForm.append(clearIconCode);

            var $searchClear = $('.search-clear');

            $searchClear.on('click', function() {

                //$searchField.attr('placeholder', '');

                $searchField.val('');

                $searchField.focus();
            });
        },

        showField: function(e) {
            $searchBtn.hide();
            $searchForm.show();

            if ( $searchContainer.hasClass('search-mobile') ) {
                var rowWidth = $('.bottom-footer__links').width();
                $searchForm.css('width', rowWidth);
            }
            headerSearchField.outsideClickClose();
            //$searchField.focus();

            e.preventDefault();
        },

        outsideClickClose: function() {

            $(document).on('mouseup', function(e) {
                var formContainer = $('.logo-banner__search__form');

                if ( !formContainer.is(e.target) && formContainer.has(e.target).length === 0 ) {
                    headerSearchField.hideField();
                }
            });
        },

        hideField: function() {
            $searchForm.hide();
            $searchBtn.show();
            $searchField.off('blur');
        }

    };


    // ====================================================
    // EQUAL HEIGHTS
    // ====================================================
    var equalHeights = {
        applyHeights: function (elems) {
            var height = -1;
            $(elems).each(function() {
                if ($(this).outerHeight() > height) {
                    height = $(this).outerHeight();
                }
            });
            $(elems).each(function() {
                $(this).css('min-height', height);
            });
        },
        getColumns: function($targets) {
            var offset = -1,
                columns,
                currentOffset;

            for (columns = 0; columns < $targets.length; columns += 1) {
                    currentOffset = $($targets[columns]).offset().top;

                    if(currentOffset > offset && offset !== -1) {
                        return columns;
                    }

                    offset = currentOffset;
            }
            return columns;
        },
        set: function ($elems) {
            var eq = this;
            $elems.each(function (index, elem) {
                var $elem = $(elem),
                    targetDiv = '.' + $elem.data('equalHeightsTarget'),
                    $targets,
                    setHeights;

                $targets = $(targetDiv, $elem);

                setHeights = function () {
                    var columns = eq.getColumns($targets),
                            i;
                    // reset min-height
                    $targets.css('min-height', '0');

                    if(columns > 1) {
                        for(i = 0; i < Math.ceil($targets.length / columns); i += 1) {
                            eq.applyHeights($targets.slice(columns * i, (columns * i) + columns));
                        }
                    }
                    $.publish('heightSet');
                };

                setHeights();
                $(window).resize(setHeights);

                $.subscribe('setEqualHeights', setHeights);
            });

        },
        init: function () {
            return this.set($('.equal-heights'));
        }
    };

    // ====================================================
    // ACCORDION
    // ====================================================
    var accordion = {
        init: function () {
            // Only enable the accordion at higher resolution.
            // Need to detect the screen orientation - http://bit.ly/1iMiFWH
            if (Modernizr.mq('only screen and (min-width: 480px)')) {

                // Main Accordion
                if ( $('.accordion').length > 0 ) {
                    var allPanels = $('.accordion').find('.accordion__content').hide();

                    $('.accordion > .accordion_frame > .accordion__product_list > li.accordion__item > div.accordion__tab').on('click', function() {

                          $this = $(this);
                          $target =  $this.parent().find('.accordion__content').addClass('accordion__toggle');

                          $tabtoggle = $this.parent().parent().parent();
                          if(!$target.hasClass('active')){

                            $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            $target.parent().parent().removeClass('accordion__closed');

                            allPanels.removeClass('active').slideUp();
                            $target.addClass('active').slideDown();

                          } else if(!$tabtoggle.hasClass('accordion__item')){
                            allPanels.removeClass('active').slideUp(function(){
                                $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            });
                          }

                        $.publish('setEqualHeights');


                        return false;
                    });
                    // fix for clicking on heading and nothing happending
                    $(this).find('a.js-mobile-link').click(function () {return;})
                    }
                }

            // Country selection accordion
            if (Modernizr.mq('only screen and (max-width: 480px)')) {
                $('#accordion ul').hide();
                $('#accordion li h2').on('click',
                    function() {
                        var openMe = $(this).next();
                        var mySiblings = $(this).parent().siblings().find('ul');

                        $('.accordion__active-tab').removeClass();

                        if (openMe.is(':visible')) {
                            openMe.slideUp('normal');
                            $('li').on('click', function() {
                                $(this).removeClass('accordion__active-tab');
                            });
                        } else {
                            mySiblings.slideUp('normal');
                            openMe.slideDown('normal');
                            $('li').on('click', function() {
                                $(this).addClass('accordion__active-tab');
                            });
                        }
                    }
                );
            } else {
                $(function() {
                    // Disable region link at tablet and desktop
                    $('.country-selector__title').find('a').on('click', function(){ return false});
                });
            }
            // Country selection
            $(function() {
               $('#accordion .country-selector__region_list').children().find('.input__checkbox').addClass('js-country__confirm');
               $('#accordion').find('.js-country__confirm').hide();
               $('.country-selector__country_name').on('click', function(){
                    $(this).next('.js-country__confirm').fadeToggle();
                   }
                );
            });
        }
    };

    //*
    // ====================================================
    // MINI ACCORDION
    // ====================================================
    var miniAccordion = {
        init: function () {

                // Mini Accordion
                if ( $('.accordion_mini').length > 0 ) {
                    var allPanels = $('.accordion_mini').find('.accordion__content').hide();

                    $('.accordion_mini > div > ul > li > div.accordion__tab').on('click', function() {

                          $this = $(this);
                          $target =  $this.parent().find('.accordion__content').addClass('accordion__toggle');

                          $tabtoggle = $this.parent().parent().parent();
                          if(!$target.hasClass('active')){

                            $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            $target.parent().parent().removeClass('accordion__closed');

                            allPanels.removeClass('active').slideUp();
                            $target.addClass('active').slideDown();
                          } else if(!$tabtoggle.hasClass('accordion__item')){
                            allPanels.removeClass('active').slideUp(function(){
                                $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            });
                          }

                        return false;
                    });
                }
            }
        }
    //*

    var keyLinksCombo = {
        init: function() {
            $('.js-contentSwitcher').hide();
            // TODO: Change to dynamic ID
            $('#contentSwitcher-1').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('#contentSwitcher-2').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('#contentSwitcher-3').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
        }
    };

    var IE = {
        aperture: {
            // add divs for aperture borders to match branding
            set: function (el) {
                var html = '<span class="edge edge-left"><span class="edge-top"></span></span><span class="edge edge-right"><span class="edge-top"></span></span>';
                // el.find('.aperture__content').append(html);
                el.append(html);
            },
            init: function () {
                var $aperture = $('.aperture__content'),
                    ap = this;
                $aperture.each(function () {
                    ap.set($(this));
                });
            }
        },
        // helpers for IE8
        init: function () {
            if (isIE8) {
                this.aperture.init();
            }
        }
    };


    // ====================================================
    // CAROUSELS
    // ====================================================

    var initiateCarousels = {

        // add class to change carousel visibility
        // inactive slides given visibility:hidden style to hide links when tabbing
        animate:  {
            start: function ($carousel) {
                // stop animation when tabbing
                $carousel[0].tabIndex = 0;
                $carousel.on('focus', function () {
                    $carousel.pause();
                }).on('mouseover', function () {
                    $(this).addClass('carousel__hover');
                    $carousel.pause();
                }).on('mouseleave', function () {
                    $(this).removeClass('carousel__hover');
                });
            },
            before: function ($carousel) {
                $carousel.addClass('carousel__animating');
            },
            after: function ($carousel) {
                $carousel.removeClass('carousel__animating');
            }
        },

        init: function() {
            $('.carousel').each(function (ind) {
                // console.log('carouselling ' + ind)
                $(this).flexslider({
                    animation: "slide",
                    pauseOnHover: true,
                    animationLoop: true,
                    slideshow: false,
                    controlsContainer: '.carousel .carousel__controls:eq(' + ind + ')',
                    prevText: '',
                    nextText: '',
                    start: initiateCarousels.animate.start,
                    before: initiateCarousels.animate.before,
                    after: initiateCarousels.animate.after
                });
            });
        }

    };


    // ====================================================
    // ADDAPTIVE IMAGES
    // ====================================================

    var adaptiveImages = {

        init: function() {
            $(document).foundation('interchange', {
                named_queries : {
                    //small : 'only screen and (min-width: 480px)',
                    medium : 'only screen and (min-width: 480px)',
                    large : 'only screen and (min-width: 769px)'
                }
            });
        }
    };


    // ====================================================
    // JUMP TO NAVIGATION
    // ====================================================

    var $page = $('html, body');
    var jumpToNav = {

        toggleDropDown: function(e) {
            jumpToNav.$jumpTo.toggleClass('jump-to-nav__open');
            e.preventDefault();
        },

        backToTop: function(e) {
            var goTo = 0;
            if (jumpToNav.desktop) {
                goTo = jumpToNav.startPos;
            }
            $page.animate({ scrollTop: goTo }, 'slow');
            e.preventDefault();
        },

        scrollToSection: function(e) {
            e.preventDefault();
            var i = 0,
                l = jumpToNav.positions.length,
                title = e.target.innerHTML,
                diff = 0,
                callback = function () {
                    jumpToNav.$jumpTo.removeClass('jump-to-nav__open');
                };
            // set adjustment for mobile/desktop to bring viewport inline with top of module
            if (jumpToNav.desktop) {
                diff = 47;
            } else {
                diff = 113;
            }
            // find which link has been clicked and scroll to the anchor
            for (; i < l; i += 1) {
                if (title === jumpToNav.positions[i].titleText) {
                    $page.animate({ scrollTop: jumpToNav.positions[i].pos - diff }, 'slow', callback);
                    return;
                }
            }
        },

        // check the positions of the content blocks and set start of fixed position
        checkJumpPositions: function () {
            var i = 0,
                l = jumpToNav.positions.length,
                $el;
            if (jumpToNav.desktop) {
                jumpToNav.startPos = jumpToNav.$jumpTo.offset().top;
            } else {
                jumpToNav.startPos = 65; // little over the height of the header
            }
            for (; i < l; i += 1) {
                $el = $(jumpToNav.positions[i].hid);
                if ($el.length) {
                    jumpToNav.positions[i].pos = $el.offset().top;
                }
            }
        },

        posPrevious: 0,
        scroll: function () {
            var pos = $(this).scrollTop(),
                $jumpTo = jumpToNav.$jumpTo,
                $jumpToLinks = jumpToNav.$jumpToLinks;

            if (pos > jumpToNav.startPos) {
                $jumpToLinks.addClass('jump-to-fixed');
                if (jumpToNav.desktop) {
                    $jumpToLinks[0].style.left = $jumpTo.offset().left + 'px';
                } else {
                    $jumpToLinks[0].style.left = 0;
                }
                jumpToNav.fixed = true;
            } else {
                $jumpToLinks.removeClass('jump-to-fixed');
                jumpToNav.fixed = false;
                $jumpToLinks[0].style.left = 0;
            }

            // recheck positions every 200 pixels up/down
            // this elemeninates changes from other actions, eg images loading, accordions opening
            if (pos > (jumpToNav.posPrevious + 200) || pos < (jumpToNav.posPrevious - 200)) {
                jumpToNav.posPrevious = pos;
                jumpToNav.checkJumpPositions();
            }
        },

        // Set the position of the jump menu
        setPosition: function () {
            var $jumpToLinks = jumpToNav.$jumpToLinks,
                $jumpTo = jumpToNav.$jumpTo,
                $jumpToItems = jumpToNav.$jumpToItems,
                height = $window.height(),
                linksWidth = 0;

            // width of white bar when jump links fixed
            jumpToNav.$jumpToNavBanner.width($document.width());

            // check positions of each jump item
            jumpToNav.checkJumpPositions();

            // Set container width to retain styles when position fixed
            $jumpToLinks.width('');
            // temp remove fixed class to get actual width
            if (jumpToNav.fixed) {
                $jumpToLinks.removeClass('jump-to-fixed');
            }

            // reduce height by banner/header height and check width for toggle and list
            if (jumpToNav.desktop) {
                linksWidth = $jumpTo.width() + 16;
                height -= 47; // banner height
            } else {
                linksWidth = '100%';
                height -= 113; // header height
            }
            // add a height to the dropdown to enable scrolling on short screens or landscape mobiles
            if (height < jumpToNav.linksHeight) {
                $jumpToItems.height(height);
            } else {
                $jumpToItems.height('');
            }

            // add back in fixed class if removed above
            if (jumpToNav.fixed) {
                $jumpToLinks.addClass('jump-to-fixed');
            }

            // Set the width of the toggle and list
            $jumpToLinks.width(linksWidth);
            if (jumpToNav.desktop) {
                $jumpToItems[0].style.width = linksWidth + 'px'; // using width method add 2 extra pixels - good job jQueryreary
            } else {
                $jumpToItems[0].style.width = linksWidth;
            }

            // set offset for when fixed position
            if (jumpToNav.desktop) {
                if (jumpToNav.fixed) {
                    $jumpToLinks[0].style.left = $jumpTo.offset().left + 'px';
                    jumpToNav.leftFixedPos = $jumpTo.offset().left + 'px';
                }
            } else {
                $jumpToLinks[0].style.left = 0;
            }
        },

        // set enquire actions
        enquire: function () {
            // enquire doesn't seem to place nice in IE8
            if (isIE8) {
                jumpToNav.desktop = true;
            } else {
                enquire.register('screen and (min-width: 769px)', {
                    match : function() {
                        // Set mode in
                        jumpToNav.desktop = true;
                    },
                    unmatch : function() {
                        jumpToNav.desktop = false;
                    },
                    deferSetup : true,
                    setup : function() {
                        jumpToNav.desktop = true;
                    }
                }, true);
            }
        },

        init: function() {
            this.$jumpTo = $('.jump-to-nav');

            if (this.$jumpTo.length) {
                // store els in DOM
                this.$jumpToLinks = $('.jump-to-nav__links');
                this.$jumpToLink = $('.jump-to-nav__link');
                this.$jumpToItems = $('.jump-to-nav__items');
                this.$jumpToNavBackToTop = $('.jump-to-nav-bkToTop');
                this.$jumpToNavToggle = $('.jump-to-nav-toggle');
                this.$jumpToPosTitle = $('.jump-to-nav-toggle__pos-title');
                this.$jumpToNavBanner = $('.jump-to-nav-banner');
                this.positions = [];
                this.desktop = false; // viewing mode

                // Add initialise class to show all elements in DOM to get sizes etc
                this.$jumpTo.addClass('jump-to-nav__active jump-to-nav__init');
                // set height of nav list for landscape mobes
                this.linksHeight = this.$jumpToItems.height();
                // store details of each jump link
                this.$jumpToLink.each(function () {
                    jumpToNav.positions.push({ hid: this.hash, pos: null, titleText: this.innerHTML, width: $(this).width() });
                });
                this.$jumpTo.removeClass('jump-to-nav__init');

                // add click events
                this.$jumpToNavToggle.on('click', this.toggleDropDown);
                this.$jumpToNavBackToTop.on('click', this.backToTop);
                this.$jumpToLink.on('click', this.scrollToSection);

                // Set size and scroll events
                this.enquire();
                jumpToNav.setPosition();
                $window.resize(jumpToNav.setPosition);
                $window.on('scroll', jumpToNav.scroll);
            }
        }
    };



    // ====================================================
    // SHARE TOOLS
    // ====================================================

    // changes
    // needs to be more consistent
    // position to top of content
    // fix to top on tablet
    // fix to mid on desktop
    // recalc on resize
    // 0 mobile, 1 tablet, 2 desktop
    var shareTools = {

        set: function ($share) {
            currentViewport = viewport;
            var diff = 100, // top position to start
                startPos = 0,
                endPos = 0,
                // elements
                $ignore = $('.share-ignore'),
                $shareContainer = $('.share-tools:eq(0)'),
                $end = $('[data-sticky="end"]').eq(0),
                $altEnd = $('.bottom-footer'), // alternate ending
                // dimensions
                ignoreHeight,
                leftPos,
                shareHeight = $share.height();


            function setPosition () {
                $shareContainer[0].style.top = ignoreHeight + 'px';
            }

            function setToolsPosition () {
                if (setFixed) {
                    $share.addClass('fixed');
                    $share[0].style.left = leftPos + 'px';
                    $share[0].style.top = diff + 'px';
                } else if (setAfter) {
                    $share[0].style.top = endPos + diff + 'px';
                }
            }

            // get the sizes of the positional elements
            function getDimensions () {
                ignoreHeight = $ignore.height() || 0;
                // shareHeight = $share.height();
                setPosition();
                leftPos = $shareContainer.offset().left;
                // console.log(leftPos)
                startPos = $shareContainer.offset().top - diff;
                endPos = $end.offset().top - shareHeight - diff;
                // console.log(endPos)
                if (endPos < 0) {
                    endPos = $altEnd.offset().top - shareHeight - diff;
                }
            }
            getDimensions();
            // $.subscribe('heightSet', getDimensions);

            function resize () {
                // console.log('ressizeee')
                if (currentViewport !== viewport) {
                    currentViewport = viewport;
                }
                getDimensions();
                setToolsPosition();
            }


            // only set the positions once to improve performance
            var setBefore = false,
                setAfter = false,
                setFixed = false;
            function scroll () {
                // no need to do anything on mobile
                if (currentViewport === 0) {
                    return;
                }
                var pos = $(this).scrollTop();
                var set;

                if (pos <  startPos) {
                    if (!setBefore) {
                        setBefore = true;
                        setAfter = false;
                        setFixed = false;
                        $share.removeClass('fixed');
                        $share[0].style.left = '';
                        $share[0].style.top = '';
                    }
                    set = 'pre'
                } else if (pos > endPos) {
                    if (!setAfter) {
                        setBefore = false;
                        setAfter = true;
                        setFixed = false;
                        $share.removeClass('fixed');
                        // $share[0].style.top = endPos - diff - ignoreHeight - shareHeight + 'px';
                        $share[0].style.top = endPos - startPos + 'px';
                        $share[0].style.left = '';
                    }
                    set = 'aft'
                } else {
                    if (!setFixed) {
                        setBefore = false;
                        setAfter = false;
                        setFixed = true;
                        $share.addClass('fixed');
                        $share[0].style.left = leftPos + 'px';
                        $share[0].style.top = diff + 'px';
                    }
                    set = 'ins'
                }
                // $('.debug').text(startPos + '/' + pos + '/' + endPos + '/ ' + set);
            }
            // setInterval(function () {
            //     $('.debug').text(leftPos);
            // }, 50);
            // set bindings
            // $('.mega-footer').height(1000);
            // $('body').append('<div class="debug"></div>');
            $window.on('scroll', scroll);
            $window.on('resize', resize);
            $.subscribe('pageLayoutChange', resize);
        },
        init: function () {
            var $share = $('.share-tools__body:eq(0)');

            function setShareUrl () {
                $('a').on('click', function () {
                    if (addthis) {
                        addthis.update('share', 'url', window.location.href); 
                    }
                });
            }

            if ($share.length) {
                shareTools.set($share);
                setShareUrl();
            }
        }
    };

    // ====================================================
    // COOKIE MESSAGE
    // ====================================================

    var cookieMessage = {
        init: function () {
            var $cookie = $('.cookie'),
                $cookieClose = $('.cookie__close'),
                cookieName = 'barclayscookiepolicy',
                expiredDays = 3650,
                hasSeenMessage = readCookie(cookieName);

            function closeBtn (e) {
                e.preventDefault();
                $cookie.height(0);
                setTimeout(function () {
                    $cookie.removeClass('cookie__show');
                }, 500);
            }

            if (!hasSeenMessage) {
                $cookie.addClass('cookie__show');
                $cookie.height($cookie.height());
                $cookieClose.on('click', closeBtn);
                createCookie(cookieName, true, expiredDays);
            }
        }
    };


    // ====================================================
    // STICKY HEADER -- MOBILE ONLY
    // ====================================================

    var $logoBanner =  $('[data-logo-banner]');

    var stickyHeader = {

        init: function() {
            if (isIE8) {
                return;
            }
            enquire.register( "screen and (max-width: 768px)", {

                match: function() {
                    var headerHeight = $logoBanner.height(),
                        scrollTimeout;

                    $(window).scroll(function () {
                        if ( scrollTimeout ) {
                            // clear timeout, if one is pending
                            clearTimeout(scrollTimeout);
                            scrollTimeout = null;
                        }
                        scrollTimeout = setTimeout(scrollHandler, 100);
                    });

                    scrollHandler = function() {
                        var docScroll = $(document).scrollTop(),
                            siteWidth = $siteContainer.width();

                        if ( docScroll >= headerHeight ) {
                            $logoBanner.addClass('banner-sticky').css('width', siteWidth);
                        } else {
                            $logoBanner.removeClass('banner-sticky').removeAttr('style');
                        }
                    };
                },

                unmatch: function() {
                    $logoBanner.removeClass('banner-sticky').removeAttr('style');
                }
            }, false);
        }
    };


    // ====================================================
    // TABS
    // ====================================================

    BAR.ResponsiveTab = function( selector ) {
        this.tabContainer = $(selector);
        this.tabDesktopItem = this.tabContainer.find('[data-tabs-desktop-item]');
        this.tabContent = this.tabContainer.find('[data-tabs-content]');
        this.tabMobileTrigger = this.tabContainer.find('[data-tabs-mobile-trigger]');
        this.tabMobileDropdown = this.tabMobileTrigger.next('[data-tabs-mobile-dropdown]');
        this.tabMobileItem = this.tabMobileDropdown.children('[data-tabs-mobile-item]');

        this.init();
        this.desktopHandler();
        this.mobileHandler();
        this.mobileTrigger();
    }

    BAR.ResponsiveTab.prototype = {

        init: function() {
            this.tabContent.not(':first').hide();
            this.tabDesktopItem.first().addClass('active');
        },

        desktopHandler: function() {
            var self = this;

            self.tabDesktopItem.on('click', function(e) {
                var tabIndex = $(this).index(),
                    txt = $(this).find('a').text();

                self.tabDesktopItem.removeClass('active');

                self.toggleTab(tabIndex, txt);

                e.preventDefault();
            });
        },

        mobileHandler: function() {
            var self = this,
                mobileTabLabel = this.tabMobileItem.first().text();

            // Apply the value of the first visible tab in the list
            this.tabMobileTrigger.text(mobileTabLabel);

            self.tabMobileItem.on('click', function(e) {
                var tabIndex = $(this).index(),
                    txt = $(this).find('a').text();

                self.updateTrigger(tabIndex, txt);

                e.preventDefault();
            });
        },

        toggleTab: function(tabIndex, txt) {

            this.tabContent
                .hide()
                .eq(tabIndex)
                    .show();

            this.tabMobileTrigger.text(txt);

            this.tabDesktopItem.removeClass('active');
            this.tabDesktopItem.eq(tabIndex).addClass('active');

            $.publish('setEqualHeights');
            $.publish('tabChange');
        },

        toggleDropdown: function(dropdownWidth, leftPos) {
            this.tabMobileDropdown
                .css({
                'width': dropdownWidth,
                'left': leftPos
            })
            .toggle();
        },

        mobileTrigger: function() {
            var self = this;

            self.tabMobileTrigger.on('click', function(e) {
                var dropdownWidth = $(this).outerWidth(),
                    leftPos = $(this).offset().left;

                $(this).toggleClass('active');
                self.toggleDropdown(dropdownWidth, leftPos);

                e.preventDefault();
            });
        },

        updateTrigger: function(tabIndex, txt) {
            this.tabMobileTrigger.text(txt);
            this.tabMobileDropdown.hide();

            this.tabContent.hide();
            this.tabContent.eq(tabIndex).show();

            this.tabMobileTrigger.removeClass('active');

            this.tabDesktopItem.removeClass('active');
            this.tabDesktopItem.eq(tabIndex).addClass('active');

        }
    }

    // ====================================================
    // HOVER BLOCK
    // ====================================================

    var $hoverBlockItem = $('.hover-block__item');

    var hoverBlock = {
        init: function () {

            if (Modernizr.mq('only screen and (min-width: 769px)') || isIE8) {
                $hoverBlockItem.each(function() {
                    if (!$(this).hasClass('hover-block__item--no-hover')) {
                        $(this).mouseenter(function() {
                            var max = $(this).height(),
                                $desc = $(this).find('.hover-block__desc'),
                                up = $desc.height();

                            if (up > max) {
                                up = max;
                            }
                            // $(this).addClass('hover-block__item--hover');
                            $desc.css({top: -1 * up});
                        });
                        $(this).mouseleave(function() {
                            // $(this).removeClass('hover-block__item--hover');
                            $(this).find('.hover-block__desc').css({top: ''});
                        });
                    }
                });
            }
        }
    };

    var hoverBlockGrouping = {
        set: function () {
            var $threeUp = $('.hover-block__three_up'),
                $fourUp = $('.hover-block__four_up'),
                $threeUpChildren = $threeUp.children(),
                $fourUpChildren = $fourUp.children(),
                i = 0,
                group;

            if (Modernizr.mq('only screen and (min-width: 769px)')) {
                if ( $threeUp.length > 0 ) {
                    i = 0;

                    $threeUp.addClass('hover-block--desktop');

                    while ((group = $threeUpChildren.slice(i, i += 3)).length) {
                        group.wrapAll('<div class="carousel-grid__panel"></div>');
                    }
                }
                if ( $fourUp.length > 0 ) {
                    i = 0;

                    $fourUp.addClass('hover-block--desktop');

                    while ((group = $fourUpChildren.slice(i, i += 4)).length) {
                        group.wrapAll('<div class="carousel-grid__panel"></div>');
                    }
                }
            } else {
                if ( $threeUp.length > 0 ) {
                    i = 0;

                    while ((group = $threeUpChildren.slice(i, i += 2)).length) {
                        group.wrapAll('<div class="carousel-grid__panel"></div>');
                    }
                }
                if ( $fourUp.length > 0 ) {
                    i = 0;

                    while ((group = $fourUpChildren.slice(i, i += 2)).length) {
                        group.wrapAll('<div class="carousel-grid__panel"></div>');
                    }
                }
            }
        },
        resetGrouping: function () {
            $.subscribe('dropDownChange', hoverBlockGrouping.set);
        },
        init: function () {
            this.set();
            // this.resetGrouping();
        }
    };

    var initiateHoverBlockCarousel = {
        animate:  {
            start: function ($carousel) {
                // stop animation when tabbing
                $carousel.on('mouseover', function () {
                    $(this).addClass('carousel__hover');
                }).on('mouseleave', function () {
                    $(this).removeClass('carousel__hover');
                });

                // var maxHeight = 0;

                // $carousel.find('.hover-block__desc').each(function(){
                //     if ($(this).outerHeight() > maxHeight) { maxHeight = $(this).outerHeight(); }
                // });

                // $carousel.find('.hover-block__desc').css({minHeight: maxHeight});
                $.publish('pageLayoutChange');
            },
        },

        init: function() {

            var setUp = function (el, type, ind) {
                $(el).flexslider({
                    animation: "slide",
                    start: initiateHoverBlockCarousel.animate.start,
                    prevText: '',
                    nextText: '',
                    // directionNav: true,
                    selector: '.slides > .carousel-grid__panel',
                    controlsContainer: '.carousel-grid__hover-block:eq(' + ind + ') .carousel-grid__controls-' + type,
                    slideshow: false
                });
            };
            $('.carousel-grid__hover-block').each(function (ind) {
                var type = $(this).data('type'),
                    el = this;
                setUp(el, type, ind);

                var shownInTab = false,
                    shownInDropDown = false;
                // fire a window resize event to set carousel in tabs and dropdowns but only do it once
                // this is because we can't get widths of hidden elements
                $.subscribe('tabChange', function () {
                    if (!shownInTab && $(el).width()) {
                        shownInTab = true;
                        setUp(el, type, ind);
                        $(window).resize();
                    }
                });
                $.subscribe('dropDownChange', function () {
                    if (!shownInDropDown) {
                        shownInDropDown = true;
                        $(window).resize();
                    }
                });
            });

            $('.hover-block__item:odd').addClass('odd-item');
            $('.hover-block__item:even').addClass('even-item');
        }

    };

    // ====================================================
    // Iframe
    // ====================================================

    var iframe = {
        adjustIframes: function() {
            iframe.$iframe.each(function() {
                var $this       = $(this),
                    proportion  = $this.data( 'proportion' ),
                    w           = $this.attr('width'),
                    actual_w    = $this.width();

                if ( ! proportion ) {
                    proportion = $this.attr('height') / w;
                    $this.data( 'proportion', proportion );
                }

                if ( actual_w != w ) {
                    $this.css( 'min-height', Math.round( actual_w * proportion ) + 'px' );
                }
            });
        },
        init: function() {
            this.$iframe = $('iframe');
            if (this.$iframe.length) {
                this.adjustIframes();
                $(window).on('resize load', iframe.adjustIframes);
            }
        }
    };

    // ====================================================
    // IMAGE GALLERY
    // ====================================================

    var imageGallery = {

        init: function() {
            var shownInTab = false,
                $el = $('.image-gallery__body');
            // TODO: more elegant solution needed
            if ($el.width() === 0) {
                // hidden from view
                $.subscribe('tabChange', function () {
                    if (!shownInTab && $el.width()) {
                        enquire
                            .register("screen and (max-width: 479px)", imageGallery.mobileGallery)
                            .register("screen and (min-width: 480px)", imageGallery.desktopGallery, true);
                        shownInTab = true;
                        // setTimeout(function () {
                        //     if (Modernizr.mq('only screen and (max-width: 480px)') ) {
                        //         imageGallery.mobileGallery();
                        //     } else {
                        //         imageGallery.desktopGallery();
                        //     }
                        // }, 500);
                    }
                });
            } else {
                enquire
                    .register("screen and (max-width: 479px)", imageGallery.mobileGallery)
                    .register("screen and (min-width: 480px)", imageGallery.desktopGallery, true);
            }
        },

        end: '',

        animate:  {
            start: function ($carousel) {
                $carousel[0].tabIndex = 0;
                $carousel.on('focus', function () {
                    $carousel.pause();
                }).on('mouseover', function () {
                    $(this).addClass('image-gallery__hover image-gallery__mouseover');
                    $carousel.pause();
                }).on('mouseleave', function () {
                    var $el = $(this);
                    $el.removeClass('image-gallery__hover');
                });
                $.publish('setEqualHeights');
                $(window).resize();
            },
            startMobile: function ($carousel) {
                $.publish('setEqualHeights');
                $(window).resize();
            },
            before: function ($carousel) {
                $carousel.addClass('image-gallery__animating');
                clearTimeout(imageGallery.end);
            },
            after: function ($carousel) {
                imageGallery.end = setTimeout(function () {
                    $carousel.removeClass('image-gallery__animating');
                }, 200);
            }
        },

        desktopGallery: function() {
            $('.image-gallery__thumb-slider').each(function(ind) {
                console.log(ind)
                $(this).flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    itemWidth: 130,
                    itemMargin: 5,
                    prevText: '',
                    nextText: '',
                    slideshow: false,
                    start: imageGallery.animate.start,
                    asNavFor: '.image-gallery__body:eq(' + ind + ')'
                });
            });

            $('.image-gallery__body').removeClass('image-gallery__body--mobile').each(function(ind) {
                $(this).flexslider({
                    animation: "slide",
                    directionNav: true,
                    animationLoop: true,
                    slideshow: false,
                    initDelay: 750,
                    controlsContainer: '.image-gallery__controls:eq(' + ind + ')',
                    prevText: '',
                    nextText: '',
                    start: imageGallery.animate.start,
                    before: imageGallery.animate.before,
                    after: imageGallery.animate.after,
                    sync: '.image-gallery__thumb-slider:eq(' + ind + ')'
                });
            });

            // add class to prev/next parent li for disabled arrows
            $('.flex-prev', '.image-gallery').parent().addClass('flex-prev__container').removeClass('flex-direction-nav--mobile');
            $('.flex-next', '.image-gallery').parent().addClass('flex-next__container').removeClass('flex-direction-nav--mobile');


        },

        mobileGallery: function() {
            $('.image-gallery__body').addClass('image-gallery__body--mobile').flexslider({
                animation: "slide",
                animationLoop: false,
                directionNav: true,
                prevText: '',
                nextText: '',
                start: imageGallery.animate.startMobile,
                before: imageGallery.animate.before,
                after: imageGallery.animate.after,
                slideshow: false
            });
            // add class to prev/next parent li for disabled arrows
            $('.flex-prev', '.image-gallery').parent().addClass('flex-prev__container flex-direction-nav--mobile');
            $('.flex-next', '.image-gallery').parent().addClass('flex-next__container flex-direction-nav--mobile');

        }
    };


    // ====================================================
    // GEOLOCATION - Find users country and then set cookie
    // ====================================================

    var geoLocation = {

        init: function() {

            if ( $.cookie('countryCode') === undefined ) {
                geolocator.locateByIP(geoLocation.onGeoSuccess, geoLocation.onGeoError, 1);
            }

        },

        onGeoSuccess: function(location) {
            $.cookie('countryCode', location.address.countryCode, { expires: 3650 });
        },

        onGeoError: function(message) {
        }
    };

    // ====================================================
    // TOOLTIP
    // ====================================================

    var toolTip = {

        init: function() {
            $(document).foundation({
                tooltips: {
                    selector : '.has-tip',
                    test : '.tip-top',
                    additional_inheritable_classes : [],
                    tooltip_class : '.tooltip',
                    touch_close_text: 'tap to close',
                    disable_for_touch: false,
                    tip_template : function (selector, test, content) {
                      return '<span data-selector="' + selector + ',' + test + '" class="'
                        + Foundation.libs.tooltips.settings.tooltipClass.substring(1)
                        + '">' + content + '<span class="nub"></span></span>';
                    }
                }
            });
        }
    };

    // ====================================================
    // TABLE
    // ====================================================

    var table = {
        // simplified JS to show arrow
        tableSet: function ($table) {
            var $wrapper = $table.closest('.table'),
                arrowShown = true;
            if ($table.width() > $wrapper.width()) {
                $wrapper.addClass('table--wide');
            } else {
                $wrapper.removeClass('table--wide');
            }
            $table.closest('.table--wrapper').on('scroll', function (e) {
                var $this = $(this);
                if ($this.scrollLeft() > 10) {
                    $this.closest('.table').addClass('table-scrolling');
                } else {
                    $this.closest('.table').removeClass('table-scrolling');
                }
            })
        },
        init: function () {
            $('.table__table-x-y, .table__table-x').each(function () {
                var $table = $(this);
                table.tableSet($table);
                $(window).resize(function () {
                    table.tableSet($table);
                });
            });
        }
    };


    // ====================================================
    // Map
    // ====================================================
    var map = {
        mapDesktopLoaded: false,
        mapMobileLoaded: false,
        setUp: function () {
            // set enquire actions
            if (isIE8) {
                map.loadIEMap();
            } else {
                if (Modernizr.mq('only screen and (max-width: 480px)')) {
                    if (!map.mapMobileLoaded) {
                        map.loadMobileMap();
                    }
                }
                enquire.register('screen and (min-width: 480px)', {
                    match : function () {
                        if (!map.mapDesktopLoaded) {
                            map.loadDesktopMap();
                        }
                    },
                    unmatch : function () {
                        if (!map.mapMobileLoaded) {
                            map.loadMobileMap();
                        }
                    },
                }, true);
            }
            $('.map__links a').each(function () {
                var hoverClass;
                $(this).hover(function () {
                    hoverClass = 'hover-' + $(this).data('hover');
                    map.$map.addClass(hoverClass);
                }, function () {
                    map.$map.removeClass(hoverClass);
                });
            });
        },
        loadMobileMap: function () {
            var $map = this.$map;
            $map.addClass('map--loading');
            $.ajax({
                url: $map.data('mobile'),
                dataType: "script"
            }).done(function(data) {
                $('.map__links').prepend('<div class="map--fallback"><img src="' + mapimg + '" /></div>');
                mapimg = '';
                $map.removeClass('map--loading');
                map.mapMobileLoaded = true;
            });
        },
        loadDesktopMap: function () {
            var $map = this.$map;
            map.mapDesktopLoaded = true;
            $map.addClass('map--loading');
            $.ajax({
                url: $map.data('desktop'),
                dataType: "script"
            }).done(function(data) {
                $map.find('.map__links').prepend(mapdata);
                $map.removeClass('map--loading');
                mapdata = '';
            });
        },
        loadIEMap: function () {
            this.$map.prepend('<img src="/images/citizenship/map-ie.gif" />');
        },
        init: function () {
            this.$map = $('#map');
            if (this.$map.length) {
                this.setUp();
            }
        }
    };

    // ====================================================
    // IE8 Pseudo Class Support
    // ====================================================
    var ie8PseudoClassSupport = {

        init: function() {

            if ( $('html').hasClass('lt-ie9') ) {
                ie8PseudoClassSupport.addCss3classes();
            }
        },

        addCss3classes: function() {
            $('.bottom-footer__links .links-list li:last-child').addClass('last');

            $('.storyteller__filter__col:last-child').addClass('last');

            $('.related-content__item:last-child').addClass('last');

            $('.link-blocks:last-child').addClass('last');

            $('.accordion__content_frame:last-child').addClass('last');

            $('.contact-us__primary-contacts li:last-child').addClass('last');

            $('.cross-promo div:last-child').addClass('last');
        }
    };



    // ====================================================
    // LINK BLOCK HEIGHT
    // ====================================================
     var linkBlockHeight = {
        init: function linkBlockHeightCalc() {
            var timeout

            // Execute if class (link-blocks__height)
            // is available on page
            if ( $('.link-blocks__height').length > 0 ) {
                if (Modernizr.mq('only screen and (min-width: 769px)')) {
                    $('.link-blocks__height').each(function(){
                         var $columns = $('.link-blocks__content',this);
                         var maxHeight = Math.max.apply(Math, $columns.map(function(){
                             return $(this).height();
                         }).get());
                         $columns.height(maxHeight);
                    });
                    // Set timeout on resize
                    // $(document).on("load", linkBlockHeightCalc);
                    $(window).bind('load', function() {
                      if (timeout) {
                        clearTimeout(timeout);
                      }
                      timeout = setTimeout(linkBlockHeightCalc, 1000);
                    });
                    $(window).bind('resize', function() {
                      if (timeout) {
                        clearTimeout(timeout);
                      }
                      timeout = setTimeout(linkBlockHeightCalc, 500);
                    });
                }
            }
        }
     };


    // ====================================================
    // DYNAMIC CHARTS
    // ====================================================

    var $barChart = $('.bar-chart'),
        $lineChart = $('.line-chart'),
        $donutChart = $('.donut-chart');

    var dynamicCharts = {

        init: function() {

            this.setGlobalStyles();

            this.barChart();

            this.lineChart();

            this.donutChart();

        },

        setGlobalStyles: function() {

            Highcharts.theme = {
                colors: [ '#00aeef', '#00395d', '#99dff9', '#b1a194', '#666666', '#7f9cae', '#ea6400', '#9d063b', '#ffbe10', '#339548' ],
                chart: {
                    style: {
                        fontFamily: 'Expert-Sans-Regular'
                    },
                    backgroundColor: 'none'
                },
                legend: {
                    borderWidth: 0,
                },
                yAxis: {
                    gridLineColor: '#e1e1e1'
                },
                tooltip: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                }
            };

            // Apply theme
            var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
        },

        barChart: function() {

            if ( $barChart.length > 0 ) {

                $.getJSON('/charts-data/bar-chart.json', function(data) {

                    $barChart.highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: data.title
                        },
                        legend: {
                            symbolWidth: 12,
                            symbolRadius : 12,
                            align: 'center',
                            layout: 'horizontal',
                            verticalAlign: 'bottom',
                            itemStyle: {
                                paddingBottom: '10'
                            }
                        },
                        xAxis: {
                            categories: data.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: data.yAxis,
                                align: 'middle'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        series: data.developer
                    });

                });
            }
        },

        lineChart: function() {

            if ( $lineChart.length > 0 ) {

                $.getJSON('/charts-data/line-chart.json', function(data) {

                    $lineChart.highcharts({
                        title: {
                            text: data.title
                        },
                        xAxis: {
                            categories: data.categories
                        },
                        yAxis: {
                            title: {
                                text: data.yAxis
                            }
                        },
                        series: data.sample
                    });

                });
            }

        },

        donutChart: function() {

            if ( $donutChart.length > 0 ) {

                $.getJSON('/charts-data/donut.json', function(data) {

                    $donutChart.highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: data.title
                        },
                        legend: {
                            align: 'right',
                            layout: 'vertical',
                            verticalAlign: 'middle',
                            itemStyle: {
                                paddingBottom: '10'
                            },
                            symbolWidth: 12,
                            symbolRadius : 12
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                center: [ '60%', '50%' ],
                                dataLabels: {
                                    enabled: false,
                                },
                                showInLegend: true
                            }
                        },
                        series: [
                            {
                                type: 'pie',
                                name: data.name,
                                innerSize: '65%',
                                data: data.sample
                            }
                        ]

                    });

                });
            }

            if ( $('.donut-chart-narrow').length > 0 ) {

                $.getJSON('/charts-data/donut.json', function(data) {

                    $('.donut-chart-narrow').highcharts({
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        title: {
                            text: data.title
                        },
                        legend: {
                            align: 'center',
                            layout: 'horizontal',
                            verticalAlign: 'bottom',
                            itemStyle: {
                                paddingBottom: '10'
                            },
                            symbolWidth: 12,
                            symbolRadius : 12
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                center: [ '50%', '50%' ],
                                dataLabels: {
                                    enabled: false,
                                },
                                showInLegend: true
                            }
                        },
                        series: [
                            {
                                type: 'pie',
                                name: data.name,
                                innerSize: '65%',
                                data: data.sample
                            }
                        ]

                    });

                });
            }

        }

    };

    // ====================================================
    // MEGA MENU STICKY - DESKTOP ONLY
    // ====================================================
    var $mainNavigation = $('.main-nav');

    var megaMenuSticky = {

        init: function() {

            enquire.register( "screen and (min-width: 769px)", {

                match: function() {

                    // calculate header height
                    var topNavBarHeight = $('.top-nav-bar').outerHeight(),
                        logoBannerHeight = $logoBanner.outerHeight(),
                        //mainNavHeight = $mainNavigation.outerHeight(),
                        totalHeaderHeight = (topNavBarHeight + logoBannerHeight);

                    var scrollTimeout;

                    $(window).scroll(function () {
                        if ( scrollTimeout ) {
                            // clear timeout, if one is pending
                            clearTimeout(scrollTimeout);
                            scrollTimeout = null;
                        }
                        scrollTimeout = setTimeout(scrollHandler, 5);
                    });

                    scrollHandler = function() {
                        var docScroll = $(document).scrollTop(),
                            siteWidth = $siteContainer.width(),
                            navHeight = $mainNavigation.height();

                        if ( docScroll >= totalHeaderHeight ) {
                            $logoBanner.css('margin-bottom', navHeight);
                            $mainNavigation.addClass('header-sticky').css('width', siteWidth);
                        } else {
                            $logoBanner.css('margin-bottom', '0');
                            $mainNavigation.removeClass('header-sticky').removeAttr('style');
                        }
                    };

                },

                unmatch: function() {
                    // GL: temp added in as erroring on resize
                    try {
                    $mainNavigation.removeClass('header-sticky').removeAttr('style');
                    } catch (err) {}
                }
            }, true);
        }
    };

    // ====================================================
    // DROPDOWN CONTAINER
    // ====================================================

    var $dropdownDesktopItem = $('[data-dropdown-desktop-item]'),
        $dropdownContent = $('[data-dropdown-content]'),
        $dropdownTrigger = $('[data-dropdown-trigger]'),
        $dropdownControls = $('[data-dropdown-controls]'),
        $selectDropdown = $dropdownTrigger.next('[data-dropdown-dropdown]'),
        $dropdownItem = $selectDropdown.children('[data-dropdown-item]'),
        $dropdownItemLabel = $selectDropdown.children('[data-dropdown-item]:first-child').text();

    var dropdownContainer = {

        init: function() {
            var $self = $(this),
            dropdownLabel = $dropdownItemLabel,
            dropdownControlWidth = $dropdownItem.parent().outerWidth();

            if (Modernizr.mq('only screen and (min-width: 480px)')) {
                $dropdownContent.not(':first').hide();
                $dropdownDesktopItem.on('click', this.toggleDropdownContainer);

                $dropdownTrigger.text(dropdownLabel);
                $dropdownTrigger.on('click', this.toggleDropdownContainer);
                $dropdownItem.on('click', this.updateDropdownTrigger);
                //Control the width of the Dropdown
                $dropdownControls.css({
                    'min-width':'160px',
                    'max-width': dropdownControlWidth
                });
            } else {
                $dropdownContent.not(':first').hide();
                $dropdownDesktopItem.on('click', this.toggleDropdownContainer);

                $dropdownTrigger.text(dropdownLabel);
                $dropdownTrigger.on('click', this.toggleDropdownContainer);
                $dropdownItem.on('click', this.updateDropdownTrigger);
                //Control the width of the Dropdown
                $dropdownControls.css({
                    'min-width':'160px',
                    'max-width': '100%'
                });
            }
        },

        toggleDropdownContainer: function(e) {
            var $self = $(this),
                dropdownWidth = $self.outerWidth(),
                leftPos = $self.offset().left;

            $self.toggleClass('active');
            $selectDropdown
                .css({
                    'width': dropdownWidth,
                    'overflow':'hidden'
                })
                .toggle();

            e.preventDefault();
        },

        updateDropdownTrigger: function(e) {
            var $self = $(this),
                txt = $self.find('a').text(),
                tabIndex = $self.index();

            $dropdownTrigger.text(txt);
            $selectDropdown.hide();
            $dropdownContent.hide();
            $dropdownContent.eq(tabIndex).show();

            $dropdownTrigger.removeClass('active');

            $dropdownDesktopItem.eq(tabIndex).removeClass('active');
            $dropdownDesktopItem.eq(tabIndex).addClass('active');

            $.publish('setEqualHeights');
            $.publish('dropDownChange');
            e.preventDefault();

        }

    };


    // ====================================================
    // INPUT FIELDS PLACEHOLDER TEXT
    // ====================================================

    BAR.SearchPlaceholder = function( selector ) {
        this.searchInput = $(selector);

        this.init();
        this.attachHandlers();
    }

    BAR.SearchPlaceholder.prototype = {

        init: function() {
            this.searchInput.addClass('idleField');
        },

        attachHandlers: function() {
            var self = this;

            self.searchInput.on('focus', this.searchFocus);
            self.searchInput.on('blur', this.searchBlur);
        },

        searchFocus: function() {
            var self = this,
                $self = $(this);

            $self.removeClass('idleField').addClass('focusField');
            if (self.value == self.defaultValue){
                self.value = '';
            }
            if(self.value != self.defaultValue){
                self.select();
            }
        },

        searchBlur: function() {
            var self = this,
                $self = $(this);

            $self.removeClass('focusField').addClass('idleField');
            if ($.trim(self.value) == ''){
                self.value = (self.defaultValue ? self.defaultValue : '');
            }
        }
    }

    var headerSearchBox = new BAR.SearchPlaceholder('[data-search-field]');


    // ====================================================
    // LIGHTBOX
    // ====================================================

    var lightbox = {

        init: function() {

            $.extend(true, $.magnificPopup.defaults, {
                type: 'ajax',
                showCloseBtn: false,
                enableEscapeKey: false,
                closeOnBgClick: false
            });

            this.cookieDisclaimer();
            this.externalDisclaimer();
        },

        cookieDisclaimer: function() {
            $('.disclaimer-alert').magnificPopup({
                callbacks: {
                    ajaxContentAdded: function() {

                        if ( this.probablyMobile === true ) {
                            var viewportHeight = $(window).height();

                            this.wrap.addClass('mfp-align-top');
                            this.contentContainer.css('max-height', viewportHeight);
                        }

                        $('.disclaimer__cancel').on('click', function(e) {
                            $.magnificPopup.close();

                            e.preventDefault();
                        });

                        $('.disclaimer__accept').on('click', function(e) {

                            $.cookie('AcceptDisclaimer', 'true');
                            $.magnificPopup.close();

                            e.preventDefault();
                        });
                    }
                }
            });
        },

        externalDisclaimer: function() {
            $('.disclaimer-redirect').magnificPopup({
                callbacks: {
                    ajaxContentAdded: function() {
                        this.content.addClass('re-direct');

                        $('.disclaimer__cancel').on('click', function(e) {
                            $.magnificPopup.close();

                            e.preventDefault();
                        });

                        $('.disclaimer__accept').on('click', function(e) {

                            $.magnificPopup.close();

                            e.preventDefault();
                        });
                    }
                }
            });
        }
    };

    // ====================================================
    // NO IMAGE ITEM - FOR STORYTELLER, SEARCH, TOPICS ITEMS THAT HAVE NO IMAGES
    // ====================================================
    var $topicResultItem = $('[data-topics-item]'),
        $storyItem = $('[data-storyteller-item]');

    var noImageItem = {

        init: function() {
            this.topicResults();
            this.storyTeller();
        },

        topicResults: function() {
            $topicResultItem.each(function(i) {
                if ( $(this).find('img').length == 0 ) {
                    $(this).find('.topic-results__item__copy').addClass('topic-border');
                }
            });
        },

        storyTeller: function() {
            $storyItem.each(function(i) {
                if ( $(this).find('img').length == 0 ) {
                    $(this).find('.storyteller__item__copy').addClass('story-border');
                }
            });
        }
    };


    // ====================================================
    // TABS BASIC
    // ====================================================

    BAR.TabBasic = function( selector ) {
        this.tabContainer = $(selector);
        this.tabLinks = this.tabContainer.find('.tabs-basic__menu a');
        this.tabContent = this.tabContainer.find('.tabs-basic__item');

        this.init();
    }

    BAR.TabBasic.prototype = {

        init: function() {
            this.checkTabCount();
        },

        checkTabCount: function() {

            if ( this.tabContent.length > 1 ) {
                this.tabContent
                    .hide()
                    .first()
                        .show();

                this.tabLinks
                    .first()
                        .addClass('active');

                this.bindClickHandler();
            } else {
                this.tabContainer.addClass('no-tabs-mode');
            }
        },

        bindClickHandler: function() {
            var self = this;

            this.tabLinks.on('click', function(e) {
                var tabIndex = $(this).parent().index();
                self.tabLinks.removeClass('active');
                $(this).addClass('active');
                self.toggleTab(tabIndex)
                e.preventDefault();
            });
        },

        toggleTab: function(tabIndex) {
            this.tabContent
                .hide()
                .eq(tabIndex)
                    .show();
        }
    }

    // Basic tabs for Share Price Feed
    var shareTabs = new BAR.TabBasic('.tab1');
    var shareTabs2 = new BAR.TabBasic('.tab2');


    // ====================================================
    // SET GLOBAL VIEWPORT
    // ====================================================

    var checkViewport = {
        get: function () {
            if (Modernizr.mq('only screen and (min-width: 769px)')) {
                viewport = 2;
            } else if (Modernizr.mq('only screen and (min-width: 480px)')) {
                viewport = 1;
            } else {
                viewport = 0;
            }
        },
        init: function () {
            this.get();
            $window.on('resize', checkViewport.get);
        }
    };

    // ====================================================
    // INITIALISATIONS
    // ====================================================

    Modernizr.load([
        //first test need for polyfill
        {
            test: window.matchMedia,
            yep: "javascripts/vendor/enquire.min.js",
            nope: ["javascripts/vendor/matchMedia.js", "javascripts/vendor/matchMedia.addListerner.js"],

            complete: function() {
                megaMenuSticky.init();
                stickyHeader.init();
                headerSearchField.init();
                // BAR.Storyteller.init('.storyteller-1', 9);
                // BAR.Storyteller.init('.storyteller-2', 9);
                // jumpToNav.init();
                imageGallery.init();
                table.init();
                // map.init();
                // BAR.TopicResults.init('.topic-results', 12);
                // BAR.SearchResults.init('.search-results', 9);
            }
        },
    ]);

    geoLocation.init();

    // megaMenu.init();

    offCanvasMenu.init();

    // offCanvasMenuNestedLevels.init();

    cookieMessage.init();

    equalHeights.init();

    accordion.init();

    IE.init();

    initiateCarousels.init();

    adaptiveImages.init();

    shareTools.init();

    checkViewport.init();

    keyLinksCombo.init();

    iframe.init();

    hoverBlock.init();

    hoverBlockGrouping.init();

    initiateHoverBlockCarousel.init();

    toolTip.init();

    ie8PseudoClassSupport.init();

    linkBlockHeight.init();

    dropdownContainer.init();

    miniAccordion.init();

    lightbox.init();

    noImageItem.init();

    var resTab1 = new BAR.ResponsiveTab('.resTab1');
    var resTab2 = new BAR.ResponsiveTab('.resTab2');

    // dynamicCharts.init();

}());

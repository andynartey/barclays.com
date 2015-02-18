// CREATE BARCLAYS NAMESPACE
var BAR = BAR || {};

// quietly dispose of console errors in IE
if (typeof console === 'undefined') {
    var console = {
        log: function () {}
    };
}

// Delegate .transition() calls to .animate()
// if the browser can't do CSS transitions.
if (!$.support.transition) $.fn.transition = $.fn.animate;

if (/*@cc_on!@*/false) {
    document.documentElement.className+=' ie10';
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

    //Real Width of Element even if element/parents are hidden
    $.fn.elementRealWidth = function () {
        $clone = this.clone()
            .css("visibility","hidden")
            .appendTo($('body'));
        var $width = $clone.outerWidth();
        $clone.remove();
        return $width;
    };

    // Set globals
    var isIE8 = $('html').hasClass('lt-ie9'),
        $document = $(document),
        $window = $(window),
        viewport = 0, // 0 mobile, 1 tablet, 2 desktop
        $siteContainer = $('.site-container');


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
            height += 2;
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

                    if(columns > 1) {
                        for(i = 0; i < Math.ceil($targets.length / columns); i += 1) {
                            eq.applyHeights($targets.slice(columns * i, (columns * i) + columns));
                        }
                    }
                    $.publish('heightSet');
                };

                setHeights();
                $window.resize(setHeights);

                $.subscribe('setEqualHeights', setHeights);

                var endChange;


                $targets.each(function () {
                    // console.log($(this));return
                    $(this).mutate('height', function () {
                        clearTimeout(endChange);
                        endChange = setTimeout(function () {
                            $targets.css('min-height', '');
                            setHeights();
                        }, 200);
                    });
                });

            });

        },
        init: function () {
            if (!isIE8) {
                return this.set($('.equal-heights'));
            }
        }
    };

    // ====================================================
    // ACCORDION
    // ====================================================
    var accordion = {
        init: function () {

        // Only enable the accordion at higher resolution.
        // Need to detect the screen orientation - http://bit.ly/1iMiFWH

        enquire
            .register( "screen and (min-width: 480px)", {
                match: function() {
                    // Main Accordion
                    if ( $('.accordion').length > 0 ) {
                    var allPanels = $('.accordion').find('.accordion__content').hide();
                        allPanels.parent().parent().attr('aria-expanded','false')
                            .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');

                    $('.accordion > .accordion_frame > .accordion__product_list > li.accordion__item > div.accordion__tab').on('click', function() {

                          $this = $(this);
                          $target =  $this.parent().find('.accordion__content').addClass('accordion__toggle');
                            allPanels.parent().parent(":not('.accordion__closed')").find('span.visuallyhidden').remove();
                            allPanels.parent().parent(":not('.accordion__closed')").attr('aria-expanded','false');
                            allPanels.parent().parent(":not('.accordion__closed')").prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');

                          $tabtoggle = $this.parent().parent().parent();

                          if(!$target.hasClass('active')){
                            $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            $target.parent().parent().removeClass('accordion__closed').attr('aria-expanded','true');

                            allPanels.removeClass('active').slideUp(function(){
                                $this.parent().find('span.visuallyhidden').remove();
                                    $this.parent().prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                            });
                            $target.addClass('active').slideDown(function(){
                                $this.parent().find('span.visuallyhidden').remove();
                                    $this.parent().prepend('<span class="visuallyhidden" aria-live="polite">Expanded</span>');
                            });

                          } else if(!$tabtoggle.hasClass('accordion__item')){
                            $target.parent().parent().find('span.visuallyhidden').remove();
                            allPanels.removeClass('active').slideUp(function(){
                                $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed').attr('aria-expanded','false')
                                    .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                            });
                          }

                        $.publish('setEqualHeights');
                        $.publish('accordionOpen');

                        return false;
                    });
                    // fix for clicking on heading and nothing happending
                    $(this).find('a.js-mobile-link').click(function () {return;})
                    }
                },
                unmatch: function() {
                    // We need to reset
                    $window.resize(function() {
                         if($window.width() < 440) {
                          location.reload();
                         }
                    });
                },
                destroy: function() {
                    // We need to reset
                    $window.resize(function() {
                         if($window.width() < 440) {
                          location.reload();
                         }
                    });
                }
            }, true);

            // Country selection accordion
            if (Modernizr.mq('only screen and (max-width: 480px)')) {
                $('#accordion ul').hide();
                $('#accordion > li').attr('aria-expanded','false')
                    .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                $('#accordion li h2').on('click',
                    function() {
                        var openMe = $(this).next();
                        var mySiblings = $(this).parent().siblings().find('ul');

                        $('.accordion__active-tab').find('.visuallyhidden').remove();
                        $('.accordion__active-tab').removeClass()
                            .attr('aria-expanded','false')
                                .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');

                        if (openMe.is(':visible')) {
                            openMe.slideUp('normal');
                            $('li').on('click', function() {
                                $(this).find('.visuallyhidden').remove();
                                $(this).removeClass('accordion__active-tab')
                                    .attr('aria-expanded','false')
                                        .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                            });
                        } else {
                            mySiblings.slideUp('normal');
                            openMe.slideDown('normal');
                            $('li').on('click', function() {
                                $(this).find('.visuallyhidden').remove();
                                $(this).addClass('accordion__active-tab')
                                    .attr('aria-expanded','true')
                                        .prepend('<span class="visuallyhidden" aria-live="polite">Expanded</span>');
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
                        allPanels.parent().parent().attr('aria-expanded','false')
                            .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');

                    $('.accordion_mini > div > ul > li > div.accordion__tab').on('click', function() {

                        $this = $(this);
                        $target =  $this.parent().find('.accordion__content').addClass('accordion__toggle');
                        allPanels.parent().parent(":not('.accordion__closed')").find('span.visuallyhidden').remove();
                        allPanels.parent().parent(":not('.accordion__closed')").attr('aria-expanded','false');
                        allPanels.parent().parent(":not('.accordion__closed')").prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');

                        $tabtoggle = $this.parent().parent().parent();

                        if ( !$target.hasClass('active') ) {
                            $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed');
                            $target.parent().parent().removeClass('accordion__closed').attr('aria-expanded','true');

                            allPanels.removeClass('active').slideUp(function(){
                                $this.parent().find('span.visuallyhidden').remove();
                                $this.parent().prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                            });
                            $target.addClass('active').slideDown(function(){
                                $this.parent().find('span.visuallyhidden').remove();
                                $this.parent().prepend('<span class="visuallyhidden" aria-live="polite">Expanded</span>');
                            });

                        } else if ( !$tabtoggle.hasClass('accordion__item') ) {
                            $target.parent().parent().find('span.visuallyhidden').remove();
                            allPanels.removeClass('active').slideUp(function(){
                                $this.parents().find('.accordion__item').not('.accordion__closed').addClass('accordion__closed').attr('aria-expanded','false')
                                    .prepend('<span class="visuallyhidden" aria-live="polite">Collapsed</span>');
                            });
                        }

                        $.publish('accordionOpen');

                        return false;
                    });
                }
            }
        }
    //*

    //*
    // ====================================================
    // BUTTON FILTER
    // ====================================================
    BAR.ButtonFilter = function( selector ) {
         this.ButtonContainer = $(selector);
         this.init();
    }

    BAR.ButtonFilter.prototype = {
        init: function() {
            this.ButtonContainer.find('.js-contentSwitcher').hide();
            // TODO: Change to dynamic ID
            this.ButtonContainer.find('.contentSwitcher').change(function() {
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });

                $('#' + this.value).show();
            });
        }
    }

    var keyLinksCombo = {
        init: function() {
            $('.js-contentSwitcher').hide();
            // TODO: Change to dynamic ID
            $('.buttonFilter1').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.buttonFilter2').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.buttonFilter3').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.buttonFilter4').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
        }
    };

    //*


    //*
    // ====================================================
    // OFFICE FILTER
    // ====================================================
    BAR.OfficeFilter = function( selector ) {
        this.ButtonContainer = $(selector);
        this.OfficeContainer = $(selector);
        this.init();
    }

    BAR.OfficeFilter.prototype = {
        init: function() {
            this.OfficeContainer.find('.js-officeFilter').hide();
            // TODO: Change to dynamic ID
            this.OfficeContainer.find('.officeFilter').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
        }
    }

    var officeFilter = {
        init: function() {
            $('.js-officeFilter').hide();
            // TODO: Change to dynamic ID
            $('.officeFilter1').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.officeFilter2').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.officeFilter3').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
            $('.officeFilter4').change(function(){
                $(this).find("option").each(function(){
                    $('#' + this.value).hide();
                });
                $('#' + this.value).show();
            });
        }
    };

    //*

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

    BAR.initiateCarousels = {

        // add class to change carousel visibility
        // inactive slides given visibility:hidden style to hide links when tabbing
        animate:  {
            start: function ($carousel) {
                // stop animation when tabbing
                // $carousel[0].tabIndex = 0;
                // $('.flex-prev')[0].href = '#prev';
                // $('.flex-next')[0].href = '#next';
                $carousel.find('a').focus(function () {
                    $carousel.addClass('carousel__hover');
                });
                $carousel.on('mouseover', function () {
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
                    // keyboard settings move ALL carousels, need different option
                    // keyboard: true,
                    // multipleKeyboard: true,
                    animationLoop: false,
                    slideshow: false,
                    controlsContainer: '.carousel .carousel__controls:eq(' + ind + ')',
                    prevText: '',
                    nextText: '',
                    start: BAR.initiateCarousels.animate.start,
                    before: BAR.initiateCarousels.animate.before,
                    after: BAR.initiateCarousels.animate.after
                });
            });
        }

    };


    // ====================================================
    // ADDAPTIVE IMAGES
    // ====================================================

    BAR.adaptiveImages = {

        init: function() {
            $document.foundation('interchange', {
                named_queries : {
                    //small : 'only screen and (min-width: 480px)',
                    medium : 'only screen and (min-width: 480px)',
                    large : 'only screen and (min-width: 769px)'
                }
            });
            // use the image change callback to set equalHeights
            if (!isIE8) {
                $document.on('replace', 'img', function (e, new_path, original_path) {
                  // console.log(e.currentTarget, new_path, original_path);
                  $.publish('setEqualHeights');
                });
            }
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
            // debugging
            // setInterval(function () {
            //     $('.debug').text(leftPos);
            // }, 50);
            // $('.mega-footer').height(1000);
            // $('body').append('<div class="debug"></div>');

            // set bindings
            $window.on('scroll', scroll);
            $window.on('resize', resize);
            $.subscribe('pageLayoutChange', resize);
        },
        init: function () {
            var $share = $('.share-tools__body:eq(0)');
            // $('.mega-footer').height(10000) // temp test end pos

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

    BAR.cookieMessage = {
        // cookie message only goes when the close button is clicked
        // THIS IS NOT THE SAME BEHAVIOUR AS THE BARCLAYCARD SITE (which is the reference for this change)
        init: function () {
            var $cookie = $('.cookie'),
                $cookieClose = $('.cookie__close'),
                cookieName = 'barclayscookiepolicy',
                expiredDays = 3650, // Ten years
                hasSeenMessage = readCookie(cookieName);

            function closeBtn (e) {
                e.preventDefault();
                $cookie.height(0);
                setTimeout(function () {
                    $cookie.removeClass('cookie__show');
                    createCookie(cookieName, true, expiredDays);
                }, 500);
            }

            if (!hasSeenMessage) {
                $cookie.addClass('cookie__show');
                $cookie.height($cookie.height());
                $cookieClose.on('click', closeBtn);
                // createCookie(cookieName, true, expiredDays);
            }
        }
    };


    // ====================================================
    // STICKY HEADER -- MOBILE/TABLET ONLY
    // ====================================================

    var $logoBanner =  $('[data-logo-banner]');

    BAR.stickyHeader = {

        init: function() {
            if (isIE8) {
                return;
            }

            var self = this;

            this.headerHeight = $logoBanner.height();
            this.siteWidth = $siteContainer.width();

            enquire.register( "screen and (max-width: 768px)", {

                match: function() {
                    self.setScroll(self);
                },

                unmatch: function() {
                    self.stopScroll();
                }
            }, true);
        },

        setScroll: function(self) {
            var scrollTimeout;

            $window.scroll(function () {
                if ( scrollTimeout ) {
                    // clear timeout, if one is pending
                    clearTimeout(scrollTimeout);
                    scrollTimeout = null;
                }
                scrollTimeout = setTimeout(scrollHandler, 100);
            });

            scrollHandler = function() {
                var docScroll = $document.scrollTop();

                if ( docScroll >= self.headerHeight ) {
                    $logoBanner
                        .addClass('banner-sticky')
                        .css('width', self.siteWidth);
                } else {
                    $logoBanner
                        .removeClass('banner-sticky')
                        .removeAttr('style');
                }
            };
        },

        stopScroll: function() {
            $logoBanner.removeClass('banner-sticky').removeAttr('style');
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
            this.tabContent.not(':first').hide().attr('aria-hidden', 'true');
            this.tabContent.first().attr('aria-hidden', 'false');
            this.tabDesktopItem.first().addClass('active');
            this.tabDesktopItem.first().find('a').prepend('<span class="visuallyhidden">current tab:</span>');
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
            this.tabDesktopItem.find('span').remove();
            this.tabDesktopItem.eq(tabIndex).addClass('active');
            this.tabDesktopItem.eq(tabIndex).find('a').prepend('<span class="visuallyhidden">current tab:</span>');

            this.tabContent.attr('aria-hidden', 'true');
            this.tabContent.eq(tabIndex).attr('aria-hidden', 'false');

            $.publish('setEqualHeights');
            $.publish('tabChange');
            $window.resize();

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
            $.publish('tabChange');

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
                        $(this).on('mouseenter', function() {
                            var max = $(this).height(),
                                $desc = $(this).find('.hover-block__desc'),
                                up = $desc.height();

                            if (up > max) {
                                up = max;
                            }
                            // $(this).addClass('hover-block__item--hover');
                            if (Modernizr.mq('only screen and (min-width: 769px)') || isIE8) {
                                $desc.css({top: -1 * up});
                            }
                            $(this).addClass('hover-block__item--hover');
                        });
                        $(this).on('mouseleave', function() {
                            // $(this).removeClass('hover-block__item--hover');
                            $(this).find('.hover-block__desc').css({top: ''});
                            $(this).removeClass('hover-block__item--hover');
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
            function minHeight ($el) {
                if (Modernizr.mq('only screen and (max-width: 769px)')) {
                    var $desc = $el.find('.hover-block__desc'),
                        height = 0;
                    for (var i = 0; i < $desc.length; i += 1) {
                        if (height < $desc.eq(i).outerHeight()) {
                            height = $desc.eq(i).outerHeight();
                        }
                    }
                    $desc.css({minHeight: height});
                }
            }
            $threeUp.each(function () {
                minHeight($(this));
            });
            $fourUp.each(function () {
                minHeight($(this));
            });

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
            }
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
                        $window.resize();
                    }
                });
                $.subscribe('dropDownChange', function () {
                    if (!shownInDropDown) {
                        shownInDropDown = true;
                        $window.resize();
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
                $window.on('resize load', iframe.adjustIframes);
            }
        }
    };

    // ====================================================
    // IMAGE GALLERY
    // ====================================================

    var imageGallery = {

        init: function() {
            var shownInTab = false,
                shownInAccordion = false,
                $el = $('.image-gallery__body');
            // TODO: more elegant solution needed
            if ($el.width() === 0) {
                // hidden from view
                $.subscribe('tabChange', function () {
                    if (!shownInTab && $el.width()) {
                        enquire
                            .register("screen and (max-width: 479px)", imageGallery.mobileGallery)
                            .register("screen and (min-width: 480px)", imageGallery.desktopGallery, true);
                        if (Modernizr.mq('only screen and (max-width: 480px)')) {
                            imageGallery.mobileGallery();
                        }
                        shownInTab = true;
                    }
                });
                $.subscribe('accordionOpen', function () {
                    if (!shownInAccordion && $el.width()) {
                        enquire
                            .register("screen and (max-width: 479px)", imageGallery.mobileGallery)
                            .register("screen and (min-width: 480px)", imageGallery.desktopGallery, true);
                        if (Modernizr.mq('only screen and (max-width: 480px)')) {
                            imageGallery.mobileGallery();
                        }
                        shownInAccordion = true;
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
                $window.resize();
            },
            startMobile: function ($carousel) {
                $.publish('setEqualHeights');
                $window.resize();
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
            $('.image-gallery__thumb-slider').each(function(ind) {
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
            $('.image-gallery__body').addClass('image-gallery__body--mobile').each(function(ind) {
                $(this).flexslider({
                    animation: "slide",
                    animationLoop: false,
                    directionNav: true,
                    prevText: '',
                    nextText: '',
                    controlsContainer: '.image-gallery__controls:eq(' + ind + ')',
                    start: imageGallery.animate.startMobile,
                    before: imageGallery.animate.before,
                    after: imageGallery.animate.after,
                    slideshow: false,
                    sync: '.image-gallery__thumb-slider:eq(' + ind + ')'
                });
            });
            // add class to prev/next parent li for disabled arrows
            $('.flex-prev', '.image-gallery').parent().addClass('flex-prev__container flex-direction-nav--mobile');
            $('.flex-next', '.image-gallery').parent().addClass('flex-next__container flex-direction-nav--mobile');

        }
    };



    // ====================================================
    // TOOLTIP
    // ====================================================

    var toolTip = {

        init: function() {
            $document.foundation({
                tooltips: {
                    selector : '.has-tip',
                    additional_inheritable_classes : [],
                    tooltip_class : '.tooltip',
                    touch_close_text: 'tap to close',
                    disable_for_touch: false,
                    tip_template : function (selector, content) {
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
                $window.resize(function () {
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
                    }
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
    BAR.ie8PseudoClassSupport = {

        init: function() {

            if ( $('html').hasClass('lt-ie9') ) {
                this.addCss3classes();
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

            $('.latest-news__item:last-child').addClass('last');

            $('.link-blocks__height .link-blocks__4-columns:nth-child(5n)').addClass('clear');

            $('.grid-container-2 .grid-container-item:nth-child(2n+3)').addClass('clear');
            $('.grid-container-2-2 .grid-container-item:nth-child(2n+3)').addClass('clear');

            $('.grid-container-3 .grid-container-item:nth-child(3n+4)').addClass('clear');
            $('.grid-container-3-3 .grid-container-item:nth-child(3n+4)').addClass('clear');

            $('.grid-container-4 .grid-container-item:nth-child(4n+5)').addClass('clear');
            $('.grid-container-4-4 .grid-container-item:nth-child(4n+5)').addClass('clear');
        }
    };



    // ====================================================
    // LINK BLOCK HEIGHT
    // ====================================================
     var linkBlockHeight = {

        init: function linkBlockHeightCalc() {
            var timeout;

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
                    $window.bind('load', function() {
                      if (timeout) {
                        clearTimeout(timeout);
                      }
                      timeout = setTimeout(linkBlockHeightCalc, 1000);
                    });

                    $window.bind('resize', function() {
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
                    borderWidth: 0
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
                            //symbolWidth: 12,
                            //symbolRadius : 12,
                            align: 'center',
                            layout: 'horizontal',
                            verticalAlign: 'bottom',
                            itemRightBottom: 10
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
                            itemMarginBottom: 10
                            //symbolWidth: 12,
                            //symbolRadius : 12
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                center: [ '60%', '50%' ],
                                dataLabels: {
                                    enabled: false
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
                            itemRightBottom: 15
                            //symbolWidth: 12,
                            //symbolRadius : 12
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                center: [ '50%', '50%' ],
                                dataLabels: {
                                    enabled: false
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

    BAR.megaMenuSticky = {

        init: function() {
            enquire.register( "screen and (min-width: 769px)", {

                match: function() {

                    // calculate header height
                    var topNavBarHeight = $('.top-nav-bar').outerHeight(),
                        logoBannerHeight = $logoBanner.outerHeight(),
                        //mainNavHeight = $mainNavigation.outerHeight(),
                        totalHeaderHeight = (topNavBarHeight + logoBannerHeight);

                    var scrollTimeout;

                    $window.scroll(function () {
                        if ( scrollTimeout ) {
                            // clear timeout, if one is pending
                            clearTimeout(scrollTimeout);
                            scrollTimeout = null;
                        }
                        scrollTimeout = setTimeout(scrollHandler, 5);
                    });

                    scrollHandler = function() {
                        var docScroll = $document.scrollTop(),
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

    BAR.DropdownContainer = function( selector ) {
        this.dropdownContainer = $(selector);
        // this.dropdownDesktopItem = this.dropdownContainer.find('[data-dropdown-desktop-item]');
        this.dropdownContent = this.dropdownContainer.find('[data-dropdown-content]');
        this.dropdownMobileTrigger = this.dropdownContainer.find('[data-dropdown-trigger]');
        this.dropdownControls = this.dropdownContainer.find('[data-dropdown-controls]'),
        this.dropdownMobileDropdown = this.dropdownMobileTrigger.next('[data-dropdown-dropdown]');
        this.dropdownMobileItem = this.dropdownMobileDropdown.children('[data-dropdown-item]');

        this.init();
        this.dropdownHandler();
        this.dropdownTrigger();
    }

    BAR.DropdownContainer.prototype = {

        init: function() {
            this.dropdownContent.not(':first').hide();
        },

        dropdownHandler: function() {

            var self = this,
                mobileDropdownLabel = this.dropdownMobileItem.first().text(),
                mobileDropdownLabelWidth = this.dropdownMobileItem.parent().outerWidth();

            // Apply the value of the first visible Dropdown in the list and set width
            if (Modernizr.mq('only screen and (min-width: 480px)')) {
                this.dropdownMobileTrigger.text(mobileDropdownLabel);
                this.dropdownControls.css({
                    'min-width': '160px',
                    'width': mobileDropdownLabelWidth
                });
                this.dropdownMobileDropdown.css({
                    'min-width': '160px',
                    'width': '100%'
                });
            } else {
                this.dropdownMobileTrigger.text(mobileDropdownLabel);
                this.dropdownControls.addClass('dropdown__mob');
            }
            if(this.dropdownControls.height() < 60, Modernizr.mq('only screen and (min-width: 380px)')){
                // alert('X');
                this.dropdownMobileTrigger.removeClass('dropdown__cursor');
              } else if(this.dropdownControls.height() > 55){
                // alert('Y');
                this.dropdownMobileTrigger.addClass('dropdown__cursor');
                this.dropdownMobileDropdown.css({
                    'min-width': '160px',
                    'width': '100%',
                    'word-wrap': 'break-word'
                });
              }

            self.dropdownMobileItem.on('click', function(e) {
                var dropdownIndex = $(this).index(),
                    txt = $(this).find('a').text();

                self.updateTrigger(dropdownIndex, txt);

                e.preventDefault();
            });
        },

        toggleDropdown: function() {
            this.dropdownMobileDropdown.toggle();
        },

        dropdownTrigger: function() {
            var self = this;

            self.dropdownMobileTrigger.on('click', function(e) {

                $(this).toggleClass('active');
                self.toggleDropdown();

                e.preventDefault();
            });

        },

        updateTrigger: function(dropdownIndex, txt) {
            this.dropdownMobileTrigger.text(txt);
            this.dropdownMobileDropdown.hide();

            this.dropdownContent.hide();
            this.dropdownContent.eq(dropdownIndex).show();
            $.publish('dropdownChange');

            this.dropdownMobileTrigger.removeClass('active');
            if(this.dropdownControls.height() < 60){
                // alert('X');
                this.dropdownMobileTrigger.removeClass('dropdown__cursor');
              } else if(this.dropdownControls.height() > 55){
                // alert('Y');
                this.dropdownMobileTrigger.addClass('dropdown__cursor');
              }
        }

    }


    // ====================================================
    // LIGHTBOX
    // ====================================================

    BAR.lightbox = {

        init: function() {

            this.disclaimerAlert = $('.disclaimer-alert');
            this.disclaimerRedirect = $('.disclaimer-redirect');

            this.setDefaults();

            this.checkAcceptance();

            this.cookieDisclaimer();
            this.externalDisclaimer();
        },

        setDefaults: function() {
            // Set lightbox default
            $.extend(true, $.magnificPopup.defaults, {
                type: 'ajax',
                showCloseBtn: false,
                enableEscapeKey: false,
                closeOnBgClick: false
            });
        },

        checkAcceptance: function() {
            // check if acceptance cookie exists.
            // If not, launch the popup
            if ( $.cookie('AcceptDisclaimer') == undefined ) {

                $.magnificPopup.open({
                    items: [
                        {
                            src: '/modules/containers/disclaimer-copy.html',
                            type: 'ajax'
                        }
                    ],
                    callbacks: {
                        ajaxContentAdded: function() {

                            if ( this.probablyMobile === true ) {
                                var viewportHeight = $window.height();

                                this.wrap.addClass('mfp-align-top');
                                this.contentContainer.css('max-height', viewportHeight);
                            }

                            $('.disclaimer__cancel').on('click', function(e) {
                                $.magnificPopup.close();

                                e.preventDefault();
                            });

                            $('.disclaimer__accept').on('click', function(e) {

                                $.cookie('AcceptDisclaimer', 'true');
                                //$.magnificPopup.close();
                                window.location.href = window.location.pathname;

                                e.preventDefault();
                            });
                        }
                    }
                }, 0);
            }
        },

        cookieDisclaimer: function() {
            this.disclaimerAlert.magnificPopup({
                callbacks: {
                    ajaxContentAdded: function() {

                        var url = this.items[0].el.attr('href');

                        if ( this.probablyMobile === true ) {
                            var viewportHeight = $window.height();

                            this.wrap.addClass('mfp-align-top');
                            this.contentContainer.css('max-height', viewportHeight);
                        }

                        $('.disclaimer__cancel').on('click', function(e) {
                            $.magnificPopup.close();

                            e.preventDefault();
                        });

                        $('.disclaimer__accept').on('click', function(e) {

                            $.cookie('AcceptDisclaimer', 'true');
                            //$.magnificPopup.close();
                            window.location.href = url;

                            e.preventDefault();
                        });
                    }
                }
            });
        },

        externalDisclaimer: function() {
            this.disclaimerRedirect.magnificPopup({
                callbacks: {
                    ajaxContentAdded: function() {
                        this.content.addClass('re-direct');

                        $('.disclaimer__cancel').on('click', function(e) {
                            $.magnificPopup.close();

                            e.preventDefault();
                        });

                        // CQ5 - READ CORRECT TARGET LINK
                        // COMMENTED OUT FOR STAGING PURPOSES
                        /*
                        var popup = $.magnificPopup.instance;

                        if( popup != undefined ) {
                            var elementClicked = popup.st.el,
                                url =  elementClicked.attr('href'),
                                target = elementClicked.attr('target');

                            $('.disclaimer__accept').on('click', function(e) {

                                $.magnificPopup.close();

                                if ( target.toLowerCase() == '_self' ) {
                                    window.location.href = url;
                                } else {
                                    window.open(url);
                                }

                                e.preventDefault();
                            });
                        }
                        */

                        // COMMENT THIS OUT IF USING THE CODE ABOVE
                        /////////////////////////////////////////
                        var url = this.items[0].el.attr('href');
                        $('.disclaimer__accept').on('click', function(e) {

                            $.magnificPopup.close();
                            window.open(url);

                            e.preventDefault();
                        });
                        /////////////////////////////////////////
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
                self.toggleTab(tabIndex);
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
    // STORYTELLER EQUAL HEIGHTS
    // ====================================================

    BAR.Utilities = (function () {

        var equalizeHeights = function(container, selector) {
            var $items = $(selector),
                $container = $(container);

                $.subscribe('tabChange', function () {
                    _calcHeights($container, $items);
                });

            enquire
                .register("screen and (min-width: 481px) and (max-width: 768px)", {
                    match: function() {
                        _calcHeights($container, $items);
                    }
                })
                .register("screen and (min-width: 769px)", {
                    match: function() {
                        _calcHeights($container, $items);
                    }
                }, true);
        };

        var _calcHeights = function(container, selector) {
            var $items = selector,
                containerPos = container.offset();

            _resetHeights($items);

            $.subscribe('layoutReset', clearColumns());

            function clearColumns() {
                $.each($items, function(i) {
                    if ( !$(this).hasClass('js-itemHidden') ) {

                        if ( $('html').hasClass('ie9') ) {
                            if ( Math.round($(this).offset().left + 15) === Math.ceil(containerPos.left) + 1 ) {
                                $(this).addClass('clear-me');
                            }
                        } else {
                            if ( Math.round($(this).offset().left + 15) === Math.ceil(containerPos.left) ) {
                                $(this).addClass('clear-me');
                            }
                        }
                    }
                });
                $items.addClass('no-min-height');
            }
        };

        var _resetHeights = function(selector) {
            var $items = selector;

            $items.removeClass('clear-me');

            $items.removeClass('no-min-height');

            $.publish('layoutReset');

            return;
        }

        return {
            equalizeHeights: equalizeHeights
        }

    }());


    // ====================================================
    // ADAPTIVE IMAGE RELOW
    // ====================================================

    BAR.adaptiveImageReflow = {

        reflow: function() {
            $document.foundation('interchange', 'reflow');
        }
    };

    // ====================================================
    // Cookies
    // ====================================================

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }

    // ====================================================
    // INITIALISATIONS
    // ====================================================

    Modernizr.load([
        //first test need for polyfill
        {
            test: window.matchMedia,
            yep: "/javascripts/vendor/enquire.min.js",
            nope: ["/javascripts/vendor/matchMedia.js", "/javascripts/vendor/matchMedia.addListerner.js"],

            complete: function() {
                BAR.megaMenuSticky.init();
                BAR.stickyHeader.init();
                jumpToNav.init();
                imageGallery.init();
                table.init();
                map.init();
                BAR.headerSearchField.init();
                accordion.init();
            }
        },
    ]);

    BAR.adaptiveImages.init();

    BAR.GlobalNavigation.init();

    BAR.cookieMessage.init();

    equalHeights.init();

    IE.init();

    BAR.initiateCarousels.init();

    shareTools.init();

    checkViewport.init();

    keyLinksCombo.init();

    officeFilter.init();

    iframe.init();

    hoverBlock.init();

    hoverBlockGrouping.init();

    initiateHoverBlockCarousel.init();

    toolTip.init();

    BAR.ie8PseudoClassSupport.init();

    linkBlockHeight.init();

    miniAccordion.init();

    BAR.lightbox.init();

    noImageItem.init();

    dynamicCharts.init();

}());

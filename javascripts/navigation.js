var BAR = BAR || {},
    $document = $(document),
    $window = $(window);

$(function(){

    // ====================================================
    // GLOBAL NAVIGATION - INITIALISE ALL COMPONENTS
    // ====================================================
    BAR.GlobalNavigation = (function () {

        var init = function () {
            BAR.megaMenu.init();
            offCanvasMenu.init();
            offCanvasMenuNestedLevels.init();
        };

        return {
            init: init
        };
    }());


    // ====================================================
    // MEGA MENU
    // NEEDS RE-FACTORING, BUT IT WORKS ;-)
    // ====================================================

    BAR.megaMenu = {

        megaLink: $('[data-mega-top-link]'),
        megaLinksItem: $('[data-mega-links-item]'),
        menuPromo: $('[data-mega-promo]'),
        megaCloseBtn: $('[data-mega-close]'),
        megaMenuList: $('[data-mega-menu-list]'),
        megaThirdLevel: $('[data-mega-third-level-list]'),
        thirdLevelTaller: false,

        init: function() {
            var self = this;

            self.megaLink.on('click', this.checkState);
            self.setHoverIntent(self);
            self.megaCloseBtn.on('click', this.checkState);
        },

        setHoverIntent: function(self) {
            self.megaLinksItem.hoverIntent({
                over: this.hoverOpenThirdLevel,
                out: this.hoverCloseThirdLevel,
                timeout: 100,
                interval: 0
            });
        },

        checkState: function(e) {
            var $selector = $(this),
                openItems = $('.mega-active');

            if ( $selector.hasClass('mega-active') ) {
                BAR.megaMenu.closeMega(openItems);
            } else {
                BAR.megaMenu.closeMega(openItems);
                BAR.megaMenu.openMega($selector);
                BAR.megaMenu.setThirdLevel();
            }

            e.preventDefault();
        },

        openMega: function($selector) {
            var windowWidth = $window.width(),
                siteWidth = $('.top-nav-bar > .row').width(),
                leftPos = (windowWidth - siteWidth) / 2;

            $selector.parent().addClass('active');

            $selector.next('[data-mega-content]').show()
                .addClass('js-mega-menu-open')
                .attr('aria-hidden', 'false')
                .css('width', windowWidth)
                .css('left', -leftPos);

            $selector
                .addClass('mega-active')
                .focus();


            BAR.megaMenu.addHoverTopLevel();
            BAR.megaMenu.outsideClickClose($selector);
        },

        closeMega: function($selector) {
            $selector.parent().removeClass('active');
            $selector
                .focus()
                .next('[data-mega-content]')
                .hide()
                .attr('aria-hidden', 'true')
                .removeClass('js-mega-menu-open');
            $selector.removeClass('mega-active');
            $document.off('mouseup');
            BAR.megaMenu.megaMenuList.unbind('mouseenter').unbind('mouseleave');
            BAR.megaMenu.megaMenuList.removeProp('hoverIntent_t');
            BAR.megaMenu.megaMenuList.removeProp('hoverIntent_s');
        },


        outsideClickClose: function($selector) {
            var navContainer = $('.main-nav');

            $document.on('mouseup', function(e) {
                if ( !navContainer.is(e.target) && navContainer.has(e.target).length === 0 ) {
                    BAR.megaMenu.closeMega($selector);
                }
            });
        },

        addHoverTopLevel: function() {

            BAR.megaMenu.megaMenuList.hoverIntent({
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
                BAR.megaMenu.closeMega(openItems);
            } else {
                BAR.megaMenu.closeMega(openItems);
                BAR.megaMenu.openMega($selector);
            }
        },

        doNothing: function() {
            return;
        },

        hoverOpenThirdLevel: function() {
            var $selector = $(this),
                $self = $selector.find('[data-mega-third-level-list]'),
                $localMegaLinks = $selector.closest('[data-mega-links]');

            // check if a third level nav is already open
            if ( $localMegaLinks.find('.third-level-active').length > 0 ) {

                $localMegaLinks.find('.third-level-active')
                    .hide()
                    .attr('aria-hidden', 'true')
                    .removeClass('third-level-active');

                BAR.megaMenu.menuPromo.show();
            }

            // Now open third level
            var attr = $localMegaLinks.attr('style');
            if ( typeof attr !== 'undefined' ) {
                $localMegaLinks.removeStyle('height');
            }

            var localMegaLinksWidth = $localMegaLinks.width(),
                localMegaLinksHeight = $localMegaLinks.height(),
                $parentMenu = $selector.closest('.menu-links__list');

            $self
                .show()
                .css('width', localMegaLinksWidth+16)
                .css('min-height', localMegaLinksHeight-15)
                .attr('aria-hidden', 'false')
                .addClass('third-level-active');

            if ( $self.outerHeight() > localMegaLinksHeight ) {
                BAR.megaMenu.thirdLevelTaller = true;
                $localMegaLinks.css('height', $self.outerHeight() + 90);
            } else {
                BAR.megaMenu.thirdLevelTaller = false;
            }

            BAR.megaMenu.menuPromo.hide();
        },

        hoverCloseThirdLevel: function() {
            var $selector = $(this),
                $self = $selector.find('[data-mega-third-level-list]'),
                $localMegaLinks = $selector.closest('[data-mega-links]');

            $self
                .hide()
                .attr('aria-hidden', 'true')
                .removeClass('third-level-active');

            BAR.megaMenu.menuPromo.show();

            if ( !$('[data-mega-third-level-list]').hasClass('third-level-active') && BAR.megaMenu.thirdLevelTaller === true ) {
                $localMegaLinks.removeStyle('height');
                BAR.megaMenu.thirdLevelTaller = false;
            }
        },

        setThirdLevel: function() {
            var thirdLevelActiveItem = this.megaThirdLevel.find('.third-level-list__item').find('.active');

            if ( thirdLevelActiveItem.length > 0 ) {
                var $self = thirdLevelActiveItem.closest('[data-mega-third-level-list]'),
                    $localMegaLinks = thirdLevelActiveItem.closest('[data-mega-links]'),
                    localMegaLinksWidth = $localMegaLinks.width(),
                    localMegaLinksHeight = $localMegaLinks.height(),
                    $parentMenu = thirdLevelActiveItem.closest('.menu-links__list');

                $self
                    .show()
                    .css('width', localMegaLinksWidth + 16)
                    .css('min-height', localMegaLinksHeight)
                    .attr('aria-hidden', 'false')
                    .addClass('third-level-active');

                if ( $self.outerHeight() > localMegaLinksHeight ) {
                    BAR.megaMenu.thirdLevelTaller = true;
                    $localMegaLinks.css('height', $self.outerHeight() + 90);
                } else {
                    BAR.megaMenu.thirdLevelTaller = false;
                }

                BAR.megaMenu.menuPromo.hide();

            }
        }
    };


    // ====================================================
    // MOBILE HAMBURGER MENU
    // NEEDS RE-FACTORING, BUT IT WORKS ;-)
    // ====================================================
    var $siteContainer = $('.site-container'),
        $logoBanner =  $('[data-logo-banner]');

    var offCanvasMenu = {

        init: function() {

            this.offcanvasMenuHolder = $('[data-offcanvas-menu-left]');
            this.offCanvasContentLayer = $('[data-offcanvas-menu-content-layer]');
            this.offCanvasMenuTopLevel = $('[data-offcanvas-menu-top-level]');
            this.offCanvasMenuSecondLevel = $('[data-offcanvas-menu-second-level]');
            this.offCanvasMenuThirdLevel = $('[data-offcanvas-menu-third-level]');
            this.secondLevelActive = false;
            this.thirdLevelActive = false;
            this.pageHeight = $('body').height();
            this.menuWidth;

            var self = this;

            this.offcanvasMenuHolder.addClass('hidden'); // When inactive, hide from screenreaders

            $('[data-offcanvas-menu-toggle]').on('click', function(e) {

                if ( $siteContainer.hasClass('offcanvas-menu-open') ) {
                    self.closeMenu(self);
                } else {
                    self.checkIA();
                    self.openMenu(self);
                    self.checkSideScroll(self);
                }

                e.preventDefault();
            });
        },

        checkSideScroll: function(self) {
            var resizeTimer; // Set resizeTimer to empty so it resets on page load

            $window.on('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(self.closeMenu(self), 250);
            });
        },

        checkIA: function() {
            var $activeItem = this.offCanvasMenuTopLevel.find('.active').parent();

            if ( $activeItem.hasClass('off-canvas-menu__second-level') ) {
                this.secondLevelActive = true;
                this.setSecondLevel($activeItem);
            }

            if ( $activeItem.hasClass('off-canvas-menu__third-level') ) {
                this.thirdLevelActive = true;
                this.setThirdLevel($activeItem);
            }
        },

        setSecondLevel: function($activeItem) {
            this.menuWidth = this.offcanvasMenuHolder.width();

            $activeItem
                .addClass('second-level-active')
                .css('height', this.pageHeight)
                .attr('aria-hidden', 'false');

            this.offCanvasMenuTopLevel.css('left', -this.menuWidth);
        },

        setThirdLevel: function($activeItem) {
            // Need to open parent second level menu first
            var $secondLevelMenu = $activeItem.closest('[data-offcanvas-menu-second-level]');
            this.setSecondLevel($secondLevelMenu);

            // Then open the active third level

            $activeItem
                .addClass('third-level-active')
                .attr('aria-hidden', 'false')
                .css('height', this.pageHeight);

            $('.second-level-active').css('left', 0);
        },

        openMenu: function(self) {
            var contentWidth = $siteContainer.width(),
                menuWidth = $('[data-offcanvas-menu-left]').width();

            self.offcanvasMenuHolder
                .removeClass('hidden')
                .css('height', this.pageHeight);

            $siteContainer.css('width', contentWidth);
            self.closeLayer(self);

            $siteContainer.on('touchmove', function(e) {
                e.preventDefault();
            });  // disable scrolling on mobile devices

            $('.share-tools').hide();

            $siteContainer.transition({
                "margin-left": menuWidth }, 250, function() {
                    $siteContainer
                        .addClass('offcanvas-menu-open');
                });

            self.offCanvasContentLayer.show();

            if ( $logoBanner.hasClass('banner-sticky') ) {
                $logoBanner.transition({
                    "left": menuWidth
                }, 250 );
            }
        },

        closeMenu: function(self) {
            var self = self;
            $siteContainer.off('touchmove');

            $siteContainer.transition({
                "margin-left": 0,
                duration: 250,
                complete: function() {
                    self.offcanvasMenuHolder.css('height', 'auto');

                    $siteContainer
                        .css('width', 'auto')
                        .removeClass('offcanvas-menu-open')
                        .removeStyle('width')
                        .removeStyle('margin-left');

                    self.offCanvasContentLayer.off('click');
                    self.offCanvasContentLayer.hide();
                    self.offcanvasMenuHolder.addClass('hidden');

                    $('.share-tools').fadeIn('fast');
                }
            });

            if ( $logoBanner.hasClass('banner-sticky') ) {
                $logoBanner.transition({ "left": 0 }, 250 );
            }

            $window.off('resize');
        },

        closeLayer: function(self) {
            self.offCanvasContentLayer.on('click', function() {
                self.closeMenu(self);
            });
        }
    };

    var offCanvasMenuNestedLevels = {

        init: function() {
            this.offcanvasMenuHolder = $('[data-offcanvas-menu-left]');
            this.offCanvasMenuTopLevel = $('[data-offcanvas-menu-top-level]');

            $('[data-offcanvas-menu-second-link]').on('click', this.showSecondLevel);
            $('[data-offcanvas-menu-third-link]').on('click', this.showThirdLevel);
            $('[data-offcanvas-menu-second-back]').on('click', this.hideSecondLevel);
            $('[data-offcanvas-menu-third-back]').on('click', this.hideThirdLevel);
        },

        showSecondLevel: function(e) {
            var offCanvasMenuWidth = offCanvasMenuNestedLevels.offcanvasMenuHolder.width(),
                windowHeight = $('body').height();

            $(this).next('[data-offcanvas-menu-second-level]')
                .addClass('second-level-active')
                .css('height', windowHeight)
                .attr('aria-hidden', 'false');

            offCanvasMenuNestedLevels.offCanvasMenuTopLevel
                .transition({
                    left: -offCanvasMenuWidth
                }, 250);

            e.preventDefault();
        },

        hideSecondLevel: function(e) {

            $self = $(this);

            offCanvasMenuNestedLevels.offCanvasMenuTopLevel
                .transition({
                    left: 0
                }, 250, function() {
                    $('.second-level-active')
                        .removeStyle('height')
                        .removeStyle('left')
                        .attr('aria-hidden', 'true')
                        .removeClass('second-level-active');
                });

            e.preventDefault();
        },

        showThirdLevel: function(e) {
            var windowHeight = $('body').height();

            $(this).next('[data-offcanvas-menu-third-level]')
                .addClass('third-level-active')
                .attr('aria-hidden', 'false')
                .css('height', windowHeight);

            $('.second-level-active')
                .transition({
                    left: 0
                }, 250);

            e.preventDefault();
        },

        hideThirdLevel: function(e) {
            var $self = $(this);

            $self.closest('.second-level-active')
                .transition({
                    left: '100%'
                }, 250, function() {
                    $('.third-level-active')
                        .removeStyle('height')
                        .removeStyle('left')
                        .attr('aria-hidden', 'true')
                        .removeClass('third-level-active');
                });

            e.preventDefault();
        }
    };

}());
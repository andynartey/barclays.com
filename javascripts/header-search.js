// CREATE BARCLAYS NAMESPACE
var BAR = BAR || {},
    $document = $(document),
    $window = $(window);

// ====================================================
// HEADER SEARCH FIELD
// ====================================================

$(function(){

    BAR.headerSearchField = {

        init: function() {
            var self = this;
            this.searchContainer = $('[data-search]');
            this.searchBtn = $('[data-search-toggle]');
            this.searchForm = $('[data-search-form]');
            this.searchField = $('[data-search-field]');
            this.formContainer = $('.logo-banner__search__form');

            this.addSearchBtnIcon();

            enquire
                .register( "screen and (max-width: 768px)", {
                    match: function() {
                        self.searchContainer.addClass('search-mobile');
                    },

                    unmatch: function() {
                        self.searchContainer.removeClass('search-mobile');
                        if ( $('.search-clear').length > 0 ) {
                            $('.search-clear').remove();
                        }
                    }
                })
                .register( "screen and (min-width: 769px)", {
                    match: function() {
                        self.searchContainer.addClass('search-desktop');

                        if ( self.searchForm.attr('style') ) {
                            self.searchForm.removeStyle('width');
                        }
                    },

                    unmatch: function() {
                        self.searchContainer.removeClass('search-desktop');
                    }
                }, true);

            this.searchField
                .addClass('idleField')
                .on('focus', this.searchFocus)
                .on('blur', this.searchBlur);

            this.searchBtn.on('click', function(e) {
                self.showField(self);
                e.preventDefault();
            });

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
        },

        addSearchBtnIcon: function() {
            var searchIconCode = '<i class="icon icon__search"></i>';
            this.searchForm.append(searchIconCode);
        },

        clearBtn: function(self) {
            if ( !$('.search-clear').length > 0 ) {
                var clearIconCode = '<i class="icon icon__clear search-clear"></i>';
                self.searchForm.append(clearIconCode);
            }

            var $searchClear = $('.search-clear');

            $searchClear.on('click', function(e) {
                self.hideClearBtn(self);
                e.preventDefault();
            });
        },

        showField: function(self) {

            self.searchBtn.hide();
            self.searchForm.show();

            if ( self.searchContainer.hasClass('search-mobile') ) {
                var rowWidth = $window.width() - 30;
                self.searchForm.css('width', rowWidth);
            }
            self.checkUserInput(self);
            self.outsideClickClose(self);

        },

        checkUserInput: function(self) {
            self.searchField.on('keydown keypress', function() {
                self.clearBtn(self);
            });
        },

        outsideClickClose: function(self) {
            $document.on('mouseup touchend', function(e) {

                if ( !self.formContainer.is(e.target) && self.formContainer.has(e.target).length === 0 ) {
                    self.hideField(self);
                }
            });
        },

        hideField: function(self) {
            self.searchForm.hide();
            self.searchBtn.show();
            self.searchBlur();
            $document.off('mouseup touchend');
        },

        hideClearBtn: function(self) {
            self.searchField.val('Search');
            self.searchBlur();
            $(this).remove();
        }

    };
}());
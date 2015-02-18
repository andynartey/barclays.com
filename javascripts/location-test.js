 // CREATE BARCLAYS NAMESPACE
var BAR = BAR || {};

$(function(){

    BAR.ipLocation = {

        init: function() {
            var optn = {
                enableHighAccuracy : true
            };

            navigator.geolocation.getCurrentPosition(this.showLonglat, this.showError, optn);
        },

        showLonglat: function(position) {
            var latitude = position.coords.latitude,
                longitude = position.coords.longitude;

            console.log('latitude: ' + latitude);
            console.log('longitude: ' + longitude);
        },

        showError: function() {

        }

    };

    BAR.ipLocation.init();

}());
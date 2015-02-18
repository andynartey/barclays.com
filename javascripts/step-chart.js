var BAR = BAR || {};

// ====================================================
// STEP CHART
// This needs to be included AFTER main.js
// Requires highstock.js
// ====================================================

$(function() {

    BAR.StepChart = (function() {

        // Accepts target element, and path to data file
        var init = function(selector, dataUrl) {
            var $selector = $(selector),
                dataUrl = dataUrl;

            _stepChart($selector, dataUrl);
        };

        var _stepChart = function($selector, dataUrl) {

            // Check if required class exists
            if ( $selector.length > 0 ) {

                $.getJSON(dataUrl, function(data) {
                    var xCount = data.xAxisLabels.length - 1,
                        yCount = data.yAxisLabels.length - 1;

                    $selector.highcharts({
                        title: {
                            text: data.title
                        },
                        series: [{
                            data: data.seriesData,
                            step: true
                        }],
                        xAxis: {
                            min: 0,
                            max: xCount,
                            categories: data.xAxisLabels
                        },
                        yAxis: {
                            min: 0,
                            max: yCount,
                            title: { text: 'Rating' },
                            labels: {
                                formatter: function() {
                                    return data.yAxisLabels[this.value];
                                }
                            }
                        }
                    });

                });
            }

        };

        return {
            init: init
        };

    }());

}());
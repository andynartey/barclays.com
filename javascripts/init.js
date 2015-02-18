// CREATE BARCLAYS NAMESPACE
var BAR = BAR || {};

$(function(){

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
                BAR.Storyteller.init('.storyteller-1', 12);
                BAR.Storyteller.init('.storyteller-2', 12);
                BAR.Storyteller.init('.storyteller-3', 12);
                BAR.TopicResults.init('.topic-results', 12);
                BAR.SearchResults.init('.search-results', 8);

                // Preselect filters
                BAR.Storyteller.filterPreSelect('.storyteller-1');
                BAR.TopicResults.filterPreSelect('.topic-results');
                BAR.SearchResults.filterPreSelect('.search-results');
            }
        },
    ]);

    var buttonFilter1 = new BAR.ButtonFilter('.buttonFilter1'),
        buttonFilter2 = new BAR.ButtonFilter('.buttonFilter2'),
        buttonFilter3 = new BAR.ButtonFilter('.buttonFilter3');

    var officeFilter1 = new BAR.OfficeFilter('.officeFilter1'),
        officeFilter2 = new BAR.OfficeFilter('.officeFilter2'),
        officeFilter3 = new BAR.OfficeFilter('.officeFilter3');

    var dropContainer1 = new BAR.DropdownContainer('.resContainer1'),
        dropContainer2 = new BAR.DropdownContainer('.resContainer2'),
        dropContainer3 = new BAR.DropdownContainer('.resContainer3');

    var resTab1 = new BAR.ResponsiveTab('.resTab1');
    var resTab2 = new BAR.ResponsiveTab('.resTab2');

}());
/**
 * Created by C-Styles on 2/25/15.
 */

function search_ctrl_search_index ( searchService, postService) {
		alert('SearchController init');
		var searchctrl = this;
		searchctrl.inputquerystring = {string:''};
		searchctrl.resultdata = [];
		searchctrl.Tags = [];
		searchctrl.Tagfilters = [];
		postService.getalltags ().then(function(result){
				searchctrl.Tags = result;
		});
		searchctrl.settagFilters  = function() {
				searchctrl.Tagfilters = searchService.settagFilters(searchctrl.Tags);
		}
		searchctrl.getQueryQs = function () {
				searchService.searchquery (searchctrl.inputquerystring.string)
								.then (function (result) {
										console.log (result);
										searchctrl.resultdata = result;
								});
				};
}




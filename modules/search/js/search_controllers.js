/**
 * Created by C-Styles on 2/25/15.
 */

function search_ctrl_search_index (searchFactory, ROOTService) {
				var searchresults = this;
				this.Tags = ROOTService.grabAllTags ();
				this.tagFilternames = ROOTService.tagFilters.filterNames;
				this.getQueryQs = function (form) {

						searchFactory.getQsFromSearch (form)
										.success (function (result) {
												console.log (result);
												searchresults.data = result;
										});
				};
				this.setUnsetTagFilt = function (obj) {
						ROOTService.setUnsetTagFilt (obj);
				};
}




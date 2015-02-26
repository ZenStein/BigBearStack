/**
 * Created by C-Styles on 2/25/15.
 */

function search_ctrl_search_index (appSources, TagService) {
				var searchresults = this;
				this.Tags = TagService.grabAllTags ();
				this.tagFilternames = TagService.tagFilters.filterNames;
				this.getQueryQs = function (form) {

						appSources.getQsFromSearch (form)
										.success (function (result) {
												console.log (result);
												searchresults.data = result;
										});
				};
				this.setUnsetTagFilt = function (obj) {
						TagService.setUnsetTagFilt (obj);
				};
}




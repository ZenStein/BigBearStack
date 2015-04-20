/**
 * Created by C-Styles on 2/25/15.
 */

function search_ctrl_search_index ( $location, $routeParams, searchService, postService) {
	//	alert('SearchController init');
		var searchctrl = this;
		var tracker;
		var hasbeenasked = false;
		searchctrl.checker = {ischecked:false};
		searchctrl.inputquerystring = {
																																		string:'',
				                              alreadyasked:[]
																																	};
		searchctrl.resultdata = [];
		searchctrl.Tags = [];
		searchctrl.Tagfilters = [];

		postService.getalltags ().then(function(result){
				searchctrl.Tags = result;
		});
		searchctrl.settagFilters  = function() {
				searchctrl.Tagfilters = searchService.settagFilters(searchctrl.Tags);
		}
		searchctrl.post_question = function(x){
				//var x = searchctrl.inputquerystring.string;
				console.log ("called post_question func.");
				console.log (x);
				$location.path('/post/' + x );
		}
		searchctrl.getQueryQs = function (keydirection) {

				if(keydirection == 'up') {
						tracker = setTimeout (getquestions, 1000);
						function getquestions () {
								//var asked = searchctrl.inputquerystring.alreadyasked;
								var querylength = searchctrl.inputquerystring.string.length;
								    hasbeenasked = false;
								if ( querylength  > 3 ) {
										angular.forEach (searchctrl.inputquerystring.alreadyasked,
														function (string, index) {console.log(searchctrl.inputquerystring.alreadyasked[index]);

																if ( string == searchctrl.inputquerystring.string) {
																		hasbeenasked = true;
																}
														});

										if ( !hasbeenasked ){
												searchctrl.inputquerystring.alreadyasked.push (searchctrl.inputquerystring.string);
												searchService.searchquery (searchctrl.inputquerystring.string)
																.then (function (result) {
														console.log (result);
														searchctrl.resultdata = result;
												});
								  }
						  }
						}
				}
				if ( keydirection == 'down' ) {clearTimeout(tracker);}
				}
}





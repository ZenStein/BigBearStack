/**
 * Created by C-Styles on 2/25/15.
 */

//function searchFactory (searchProvider, $http) {
//		alert('searchFactory');
//		searchProvider.getQsFromSearch = function (form) {
//				var req = {
//						method: 'POST',
//						url: searchProvider.urls.searchquery,
//						headers: {'Content-Type': 'application/json'},
//						params: {'querystring': form.query}
//				};
//				return $http (req);
//		};
//
//		return searchProvider;
//}

function searchService($http, ROOT_HOST, PHPsearch ) {
     return {
		searchquery: searchquery,
		     getTags: getTags,
  gettagFilters: gettagFilters,
		 settagFilters: settagFilters
																 };

		var tagfilters = [{name: 'Kayaking', isSelected: FALSE},{'name': 'Hiking', isSelected: FALSE}];

		function searchquery (inputquerystring) {
				var req = {
						   method: 'POST',
						       url: ROOT_HOST + PHPsearch + 'getSearchResults.php',
						    headers: {'Content-Type': 'application/json'},
					      	params: {'querystring': inputquerystring}
				               };
				return $http (req);
		}
		function getTags () {
		}
		function gettagFilters(){
		}
		function settagFilters (Tags) {
				var TagArr = [];
				var numObj = Tags.length;
				for (var x = 0; x < numObj; x++) {
								if ( Tags[x].hasOwnProperty ('selected') && Tags[x].selected === true ) {
										TagArr.push (Tags[x].html);
								}
						}
				var thefilters = (TagArr.length > 0)  ? TagArr :  false;
				console.log(thefilters);
				return thefilters;
		}

}







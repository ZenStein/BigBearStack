/**
 * Created by C-Styles on 2/25/15.
 */

function searchFactory (searchProvider, $http) {
		searchProvider.getQsFromSearch = function (form) {
				var req = {
						method: 'POST',
						url: searchProvider.urls.searchquery,
						headers: {'Content-Type': 'application/json'},
						params: {'querystring': form.query}
				};
				return $http (req);
		};

		return searchProvider;
}




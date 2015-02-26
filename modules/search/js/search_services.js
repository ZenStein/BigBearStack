/**
 * Created by C-Styles on 2/25/15.
 */

function appSources (appSourcesProvider, $http) {
		appSourcesProvider.getQsFromSearch = function (form) {
				var req = {
						method: 'POST',
						url: appSourcesProvider.urls.searchquery,
						headers: {'Content-Type': 'application/json'},
						params: {'querystring': form.query}
				};
				return $http (req);
		};

		return appSourcesProvider;
}




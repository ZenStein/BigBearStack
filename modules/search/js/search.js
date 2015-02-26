/**
 * Created by C-Styles on 2/25/15.
 */
(function () {


		function search_config ($routeProvider) {
				$routeProvider
								.when ('/search', {
						templateUrl: 'modules/search/partials/search_index.html',
						controller: 'search_ctrl_search_index as Search_IndexCTRL'
				});
				//				.when ('/search/:qid', {
				//		templateUrl: 'modules/ROOTMODULE/partials/viewQ.html',
				//		controller: 'Qviewctrl as Qviewerctrl'
				//});
		}


		function appSourcesProvider (ROOT_HOST, PHPsearch) {
				function get () {
						var sayit = function () {
								alert ("isaidit");
						};
						var urls = {
								searchquery: ROOT_HOST + PHPsearch + "getSearchResults.php",
								getQ: "otherQsearch"
						};
						return {
								ROOT_HOST: ROOT_HOST,
								sayit: sayit,
								urls: urls
						};
				}

				return {
						$get: get
				};
		}
		//**********
		//app.provider ("appSourcesProvider", ["ROOT_HOST", "ROOTMODULE_PHP", function (ROOT_HOST, ROOTMODULE_PHP) {
		//		function get () {
		//				var sayit = function () {
		//						alert ("isaidit");
		//				};
		//				var urls = {
		//						searchquery: ROOT_HOST + ROOTMODULE_PHP + "getSearchResults.php",
		//						getQ: "otherQsearch"
		//				};
		//				return {
		//						ROOT_HOST: ROOT_HOST,
		//						sayit: sayit,
		//						urls: urls
		//				};
		//		}
		//
		//		return {
		//				$get: get
		//		};
		//}]);
//**********

		angular
						.module ('search', [])
						.constant('ROOT_HOST','http://localhost/')
						.constant('PHPsearch', 'modules/search/PHP/search_PHP/')
						.config (search_config)
						.provider ('appSourcesProvider', appSourcesProvider)
						.controller ('search_ctrl_search_index', search_ctrl_search_index)
						.factory('appSources', appSources);


}) ();
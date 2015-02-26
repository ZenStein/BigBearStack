/**
 * Created by C-Styles on 2/25/15.
 */
'use strict';

/* BigBearStack ROOT Module */

(function () {

		function ROOT_config ($routeProvider) {
				$routeProvider
								.when ('/', {
						templateUrl: 'modules/ROOT/partials/landing.html',
						controller: 'tester as Tester'
				})
								.otherwise ({
						redirectTo: '/'
				});
		}


		angular
						.module ('ROOT', ['ngRoute', 'ui.bootstrap', 'admin', 'featured', 'search', 'post', 'answerviewer'])
						.constant ('ROOT_HOST', 'http://localhost/')
						.constant ('ROOT_PHP', 'modules/ROOT/PHP/ROOT_PHP/')
						.config (ROOT_config)
						.service ('ROOTService', ROOTService);


}) ();
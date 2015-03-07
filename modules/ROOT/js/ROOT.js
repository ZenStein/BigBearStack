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

		function ROOTProvider (){
   //alert('ROOTProvider');
    function get(){
      //var callROOTProvider = function () {
				   // alert ("callROOTProvider");
      //};
      //var urls = {
		     // TESTROOT:"http://localhost",
		     // search:"searchQuery",
		     // getSomething:"blahblah"
      //};
      //return {
		     // callROOTProvider: callROOTProvider,
		     // urls:urls
      //};

    }
				 return {
						 $get: get
				 };
		}

		angular
						.module ('ROOT', ['ngRoute', 'ui.bootstrap', 'admin', 'featured', 'search', 'post', 'answerviewer','ngTouch'])
						.constant ('ROOT_HOST', 'http://localhost/')
						.constant ('ROOT_PHP', 'modules/ROOT/PHP/ROOT_PHP/')
						.provider('ROOTProvider', ROOTProvider)
						.config (ROOT_config)
						.service ('ROOTService', ROOTService)
						.controller('tester', tester);


}) ();
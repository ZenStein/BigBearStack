/**
 * Created by C-Styles on 2/25/15.
 */

angular
				.module ('admin')
				.factory ('admin_getallQsFactory', ['$http','ROOT_HOST','PHPadmin',
    function ($http, ROOT_HOST, PHPadmin) {


		   var  getqs = function() {
         return $http.get (ROOT_HOST + PHPadmin + 'admin_getallQs.php')
				           .then (function (result) {
		         console.log(result);
		         data = result;
		               return result;
         });
      }

		    return {
				    get: getqs
		    };
  }]);

//angular
//				.module ('admin')
//				.service ('admin_getallQsService', ['$http', 'ROOT_HOST', 'PHPadmin',
//		function ($http, ROOT_HOST, PHPadmin, $q) {
//				var deferred = $q.defer ();
//				var promise = deferred.promise;
//				var service = this;
//				service.data = {};
//
//				$http.get ('http://localhost/getQ.php?qid=33"')
//								.then (function (result) {
//						console.log ('id#123');
//						console.log (result.data);
//						promise.data = result.data;
//						service.data = promise.data;
//				});
//		}]);
//.factory()
angular
				.module ('admin')
				.factory ('admin_getallQsFactory',['$http', function ($http, ROOT_HOST, PHPadmin){
//function answerviewerFactory ($http, ROOT_HOST, PHPanswerviewer) {
		return {
				get: function () {
						return $http.get (ROOT_HOST + PHPadmin + 'admin_getallQs.php');
				}
		};
}]);


angular
				.module ('admin')
				.service('admin_getallQsService', ['admin_getallQsFactory', '$q', function (admin_getallQsFactory, $q) {
//function answerviewerService (answerviewerFactory, $q) {
		var answerviewerService = this;
		var deferred = $q.defer ();
		var promise = deferred.promise;

		//answerviewerService.data = {};

	//	this.activate = function () {
		admin_getallQsFactory.get ()
								.then (function (result) {
				promise.data = result;
				answerviewerService.data = promise.data;
				console.log(result);
				return result;
					//	promise.data = result.data;
					//	answerviewerService.data = promise.data;
					//	console.log(answerviewerService.data);
	//					return admin_getallQsFactory.get ()
		//		})
						//		.then (function (result2) {
						//promise.answers = result2.data;
						//
						//answerviewerService.data.answers = promise.answers;
						//JSON.parse(answerviewerService.data.answers);
						//JSON.parse( answerviewerService.data.answers);


	//			});
		});
}]);
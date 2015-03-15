/**
 * Created by C-Styles on 2/25/15.
 */

angular
				.module ('admin')
				.factory ('admin_getallQsFactory', ['$http','ROOT_HOST','PHPadmin',
    function ($http, ROOT_HOST, PHPadmin) {


		    var getallqs = function () {
        return $http.get (ROOT_HOST + PHPadmin + 'admin_getallQs.php')
				           .then (function (q_objs) {
						           return q_objs;
		            });
		     };
		    return getallqs;
  }]);
//.factory()

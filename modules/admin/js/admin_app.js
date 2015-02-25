/**
 * Created by C-Styles on 2/25/15.
 */


var admin_module = angular.module ('admin_module', []);

admin_module.config (['$routeProvider', function ($routeProvider) {
		$routeProvider
						.when ('/admin', {
				templateUrl: 'modules/admin/admin_index.html',
				controller: 'admindashboardcontroller as AdminDashBoardCTRL'
		})

}]);

admin_module.controller ('admindashboardcontroller', [function () {
var thisistest = {};

		thisistest.testname = "mike";
		this.tosee = thisistest.testname;
}]);
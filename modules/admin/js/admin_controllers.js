/**
 * Created by C-Styles on 2/25/15.
 */

angular.module('admin').controller('admin_getallQsController',['$scope', 'admin_getallQsFactory', function ($scope, admin_getallQsFactory){
		var allq = this;

		admin_getallQsFactory().then(function(allqs){
				console.log ('allqs');
				console.log(allqs);
				allq.allqs = allqs.data;
	 });
}]);



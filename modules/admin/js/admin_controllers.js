/**
 * Created by C-Styles on 2/25/15.
 */

angular.module('admin').controller('admin_getallQsController',['$routeParams','$scope', '$filter', '$q', 'ngTableParams', '$http', 'ROOT_HOST', 'PHPadmin',
		function ($routeParams, $scope, $filter, $q, ngTableParams, $http, ROOT_HOST, PHPadmin){
$scope.toggler = true;
		var data = [];
		var url = ROOT_HOST+ PHPadmin + 'admin_getallQs.php';
		$http.get(url).then(function (result) {
				console.log(result);
		  data = result.data;
		$scope.tableParams.reload ();
	 });
				//$scope.columns = [
				//		{title: 'Question', field: '`question`', visible: true, filter: {'question': 'text'}},
				//		{title: 'Id', field: 'id', visible: true}, {title: 'Tags', field: 'tags', visible: true}
				//];
				$scope.tableParams = new ngTableParams ({
						page: 1,            // show first page
						count: 10           // count per page
				}, {
						total:data.length, // length of data
						getData: function ($defer, params) {
								// use build-in angular filter
								var orderedData = params.sorting () ?
												$filter ('orderBy') (data, params.orderBy ()) :
												data;
								orderedData = params.filter () ?
												$filter ('filter') (orderedData, params.filter ()) :
												orderedData;

								params.total (orderedData.length); // set total for recalc pagination
								$defer.resolve ($scope.users = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
						},
						counts:[10,20,30,40],
				//		groupBy:'id'
				});


				$scope.checkboxes = {'checked': false, items: {}};

				// watch for check all checkbox
				$scope.$watch ('checkboxes.checked', function (value) {
						angular.forEach ($scope.users, function (item) {
								if ( angular.isDefined (item.id) ) {
										$scope.checkboxes.items[item.id] = value;
								}
						});
				});

				// watch for data checkboxes
				$scope.$watch ('checkboxes.items', function (values) {
						if ( !$scope.users ) {
								return;
						}
						var checked = 0, unchecked = 0,
						    total = $scope.users.length;
						angular.forEach ($scope.users, function (item) {
								checked += ($scope.checkboxes.items[item.id]) || 0;
								unchecked += (!$scope.checkboxes.items[item.id]) || 0;
						});
						if ( (unchecked == 0) || (checked == 0) ) {
								$scope.checkboxes.checked = (checked == total);
						}
						// grayed checkbox
						angular.element (document.getElementById ("select_all")).prop ("indeterminate", (checked != 0 && unchecked != 0));
				}, true);
	//	});
		/***********************************/
		/***********************************/
}]);



/**
 * Created by C-Styles on 2/26/15.
 */

function ModalInstanceCtrl ($scope, $modalInstance, $http, $routeParams, ROOT_HOST, PHPanswerviewer){

		$scope.author = "";
		$scope.title = "";
		$scope.answerheader = "";
		$scope.questionid = $routeParams.qid;

		$scope.postanswer = function () {
				alert('hitagain');
				$scope.postedAns = {
						"author": $scope.author,
						"title": $scope.title,
						"answerheader": $scope.answerheader,
						"qid": $scope.questionid
				};
				var req = {
						method: 'POST',
						url: ROOT_HOST + PHPanswerviewer + 'LoadAns_DB.php',
						headers: {'Content-Type': 'application/json'},
						data: {'test': 'thisismytesttest'},
						params: $scope.postedAns
				};
				$http (req)
								.success (function (data) {
						console.log (data);
				});
				$modalInstance.close();
		};
		
		$scope.cancel = function () {
				$modalInstance.dismiss ('cancel');
		};
}

function answerviewer_ctrl_answerviewer_index ($scope, $routeParams, $log, $modal, answerviewerService) {

		var answerviewerctrl = this;
		answerviewerctrl.init = answerviewerService.activate ($routeParams.qid);
		answerviewerctrl.package = answerviewerService.data;
   // answerviewerctrl.test = angular.fromJson(answerviewerctrl.package.answers.images);
		console.log('below answerviewer .package');
		console.log (answerviewerctrl.package);
		$scope.oneAtATime = true;

		answerviewerctrl.addanswer = function (size) {
				var modalInstance = $modal.open ({
						templateUrl: 'http://localhost/modules/answerviewer/partials/answermodalcontent.html',
						controller: 'ModalInstanceCtrl',
						size: size,
						resolve: {
								questionid: function () {
										return $scope.questionid;
								}
						}
				});

				modalInstance.result.then (function (selectedItem) {
						$scope.selected = selectedItem;
				}, function () {
						$log.info ('Modal dismissed at: ' + new Date ());
				});
		};
}



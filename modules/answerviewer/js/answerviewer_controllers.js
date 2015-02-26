/**
 * Created by C-Styles on 2/26/15.
 */

function ModalInstanceCtrl ($scope, $modalInstance, $http, $routeParams, ROOT_HOST, PHPanswerviewer){
		$scope.author = "anyn";
		$scope.answercontent = "content here";
		$scope.questionid = $routeParams.qid;

		$scope.postanswer = function () {
				$scope.postedAns = {
						"author": $scope.author,
						"answercontent": $scope.answercontent,
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
				$modalInstance.close ($scope.selected.item);
		};
		
		$scope.cancel = function () {
				$modalInstance.dismiss ('cancel');
		};
}

function answerviewer_ctrl_answerviewer_index ($scope, $routeParams, $log, $modal, answerviewerService) {

		var answerviewerctrl = this;
		answerviewerctrl.init = answerviewerService.activate ($routeParams.qid);
		answerviewerctrl.package = answerviewerService.data;
		$scope.oneAtATime = true;

		answerviewerctrl.addanswer = function (size) {
				var modalInstance = $modal.open ({
						templateUrl: 'modules/answerviewer/partials/answermodalcontent.html',
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



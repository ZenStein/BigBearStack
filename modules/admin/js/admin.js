/**
 * Created by C-Styles on 2/25/15.
 */




(function(){
		angular
						.module ('admin', [])
						.constant ('PHPadmin', 'admin_PHP/')
						.config (admin_config)
						.controller ('admin_ctrl_admin_index', admin_ctrl_admin_index)
						.controller ('admin_ctrl_unanswered', admin_ctrl_unanswered)
						.controller ('admin_ctrl_createanswer', admin_ctrl_createanswer)
						.controller ('CarouselDemoCtrl', CarouselDemoCtrl)
                        .service('adminService', adminService);




function admin_config($routeProvider){
		$routeProvider
						.when ('/admin', {
				templateUrl: 'modules/admin/partials/admin_index.html',
				controller: 'admin_ctrl_admin_index as Admin_IndexCTRL'
		})
						.when ('/admin/unanswered', {
				templateUrl: 'modules/admin/partials/admin_unanswered.html',
				controller: 'admin_ctrl_unanswered as UnansweredCTRL'
		})
						.when ('/admin/unanswered/:qid_unanswered/createanswer', {
				templateUrl: 'modules/admin/partials/admin_createanswer.html',
				controller: 'admin_ctrl_createanswer as CreateAnswerCTRL'
		});
}




		function admin_ctrl_admin_index () {
				var thisistest = {};

				thisistest.testname = "mike";
				this.tosee = thisistest.testname;
		}

		function admin_ctrl_unanswered (ROOT_HOST, PHPadmin) {
				var thisistest = {};
				thisistest.testname = ROOT_HOST + PHPadmin;
				this.tosee = thisistest.testname;
		}

		function admin_ctrl_createanswer ($scope, $http, adminService) {
 //				alert ('tester');

				var CTRL = this;
            CTRL.numimages = 1
            $scope.answerimages = [
            {imagename:'default.png'}

            ];

				//CTRL.isCollapsed = true;
				//CTRL.iteratorLimit = 3;
				//
				//
				//
				//		CTRL.checkModel = {
				//				left: false,
				//				middle: true,
				//				right: false
				//		};
				//
				//
				//CTRL.testvalue = {
				//								test:"title goes here from ctrl",
				//						headline:"headline here",
				//		 bulletpoints:[],
				//						    images:[],
				//								   footer:"footerhere"
				//						            };
				//
				//CTRL.addbullet = function(){};
				//CTRL.getimages = function(){};
				//CTRL.uploadimages = function(images){
				//
				//};
		function setAnswerImages(value){
         CTRL.answerimages = value;
           // $scope.apply();
        }

            adminService.getimages().then(function(result){
			console.log(result);
           setAnswerImages(result);
         //   $scope.$apply();
		});

            $scope.uploadFile = function (files) {
            var fd = new FormData ();
            //Take the first selected file
            fd.append ("myfile", files[0]);

            var uploadUrl = "http://localhost/upload.php";
            $http.post (uploadUrl, fd, {
                    withCredentials: true,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
            }).success (function(result){
               setAnswerImages(result);
                console.log(result);
              })
            .error (function(){console.log ('...DAMN !...');});

    };
		}
    function adminService($http, ROOT_HOST){
        return{
            getimages:getimages
        };
      		function getimages(){
				var req = {
										method: 'GET',
										    url: ROOT_HOST +'/getimagelist.php',
									  headers: {'Content-Type': 'application/json'}
								           };
				return $http (req)
						.then (function (result) {
                    console.log("log is result below");
				  console.log(result);
                    return result.data;
				  });
		}
    }

		function CarouselDemoCtrl($scope, ROOT_HOST){

				$scope.myInterval = -5;
				var slides = $scope.slides = [];
			var defaultimage = ROOT_HOST + 'images/default.png';
				var defaultslide =[
				      {
						image: defaultimage,
								text: ['default text goes here']
										   },{
								image: ROOT_HOST + 'images/default.png',
								text: ['default text goes here22']

						}];
				$scope.addSlide = function (obj) {
						var newWidth = 600 + slides.length + 1;
						slides.push (obj);
				};

						for (var i = 0; i < 2; i++) {
								$scope.addSlide (defaultslide[i]);
						}
		}

/* original copy of this function, here for reference*/
		//function CarouselDemoCtrl ($scope) {
		//		$scope.myInterval = -5;
		//		var slides = $scope.slides = [];
		//		$scope.addSlide = function () {
		//				var newWidth = 600 + slides.length + 1;
		//				slides.push ({
		//						image: 'http://placekitten.com/' + newWidth + '/300',
		//						text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
		//						['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		//				});
		//		};
		//		for (var i = 0; i < 4; i++) {
		//				$scope.addSlide ();
		//		}
		//}
}) ();
/**
 * Created by C-Styles on 2/25/15.
 */
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

function admin_ctrl_createanswer($routeParams, $scope) {


		$scope.myInterval = 0;
		var slides = $scope.slides = [];
		$scope.addSlide = function (id) {
				var newWidth = 300 + slides.length + 1;
				//alert('newWidth =  ' + newWidth);
				slides.push ({
						image: 'http://localhost/images/img' + id + '.png',
						text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
						['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
				});
		};
		for (var i = 2; i < 4; i++) {
				$scope.addSlide (i);
		}
}




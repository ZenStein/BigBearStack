/**
 * Created by C-Styles on 2/25/15.
 */
///*******/
//app.controller ('QformCtrl', ['$http', 'TagService', 'ROOT_HOST', 'ROOTMODULE_PHP', function ($http, TagService, ROOT_HOST, ROOTMODULE_PHP) {
//		var postQ = this;
//		this.Tags = TagService.grabAllTags ();
//		this.user = {"question": /*searchObject.query*/"My Great Q", "author": "Auth"};
//		var tagToggler = {"class1": false, "class2": false, "class3": true};
//
//
//		var objValsToArr = function (ArrObj) {
//				var TagString = "";
//				var numObj = ArrObj.length;
//				for (var x = 0; x < numObj; x++) {
//						if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
//								TagString += ArrObj[x].html + ",";
//						}
//				}
//				return TagString.slice (0, -1);
//		};
//
//		function reset_tags () {
//				var numObj = postQ.Tags.tagdata.length;
//				for (var x = 0; x < numObj; x++) {
//						if ( postQ.Tags.tagdata[x].hasOwnProperty ('selected') && postQ.Tags.tagdata[x].selected === true ) {
//								postQ.Tags.tagdata[x].selected = false;
//						}
//				}
//		}
//
//		function resetform () {
//				postQ.user.question = "";
//				postQ.user.author = "";
//				reset_tags ();
//				alert ("Thank you for your submitting a question!");
//		}
//
//		this.postThisQ = function (form) {
//
//				this.TagsStringhtml = objValsToArr (this.Tags.tagdata);
//				this.postedQ = {
//						'question': form.Qform.question.$viewValue,
//						'tags': this.TagsStringhtml,
//						'author': form.Qform.author.$viewValue
//				};
//				var req = {
//						method: 'POST',
//						url: ROOT_HOST + ROOTMODULE_PHP + 'LoadQ_DB.php',
//						headers: {'Content-Type': 'application/json'},
//						data: {'test': 'thisismytesttest'},
//						params: this.postedQ
//				};
//				console.log (JSON.stringify (form.Qform.question));
//				$http (req)
//								.success (function (data) {
//										console.log ("here");
//										resetform ();
//										console.log (data);
//								})
//		};
//
//}]);
/*******/





function post_ctrl_post_index ($http, TagService, ROOT_HOST, PHPpost){

		var postQ = this;
		this.Tags = TagService.grabAllTags ();
		this.user = {"question": /*searchObject.query*/"My Great Q", "author": "Auth"};
		var tagToggler = {"class1": false, "class2": false, "class3": true};


		var objValsToArr = function (ArrObj) {
				var TagString = "";
				var numObj = ArrObj.length;
				for (var x = 0; x < numObj; x++) {
						if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
								TagString += ArrObj[x].html + ",";
						}
				}
				return TagString.slice (0, -1);
		};

		function reset_tags () {
				var numObj = postQ.Tags.tagdata.length;
				for (var x = 0; x < numObj; x++) {
						if ( postQ.Tags.tagdata[x].hasOwnProperty ('selected') && postQ.Tags.tagdata[x].selected === true ) {
								postQ.Tags.tagdata[x].selected = false;
						}
				}
		}

		function resetform () {
				postQ.user.question = "";
				postQ.user.author = "";
				reset_tags ();
				alert ("Thank you for your submitting a question!");
		}

		this.postThisQ = function (form) {

				this.TagsStringhtml = objValsToArr (this.Tags.tagdata);
				this.postedQ = {
						'question': form.Qform.question.$viewValue,
						'tags': this.TagsStringhtml,
						'author': form.Qform.author.$viewValue
				};
				var req = {
						method: 'POST',
						url: ROOT_HOST + PHPpost + 'LoadQ_DB.php',
						headers: {'Content-Type': 'application/json'},
						data: {'test': 'thisismytesttest'},
						params: this.postedQ
				};
				console.log (JSON.stringify (form.Qform.question));
				$http (req)
								.success (function (data) {
						console.log ("here");
						resetform ();
						console.log (data);
				})
		};
}
/**
 * Created by C-Styles on 2/25/15.
 */


//function postService($http, ROOT_HOST, ROOT_PHP, PHPpost){
//		var postService = this;
//		var postQinit = {"question": "SomeDumbQuestionFrompostService", "author": "SomeDumbGuy"};
//		//alert('PostService Init');
//		//var req = {
//		//		method: 'POST',
//		//		url: ROOT_HOST + ROOT_PHP + 'grabtags.php',
//		//		headers: {'Content-Type': 'application/json'}
//		//};
//
//
//
//
//
//		function reset_tags () {
//				var numObj = postService.Tags.tagdata.length;
//				for (var x = 0; x < numObj; x++) {
//						if ( postService.Tags.tagdata[x].hasOwnProperty ('selected') && postService.Tags.tagdata[x].selected === true ) {
//								postService.Tags.tagdata[x].selected = false;
//						}
//				}
//		}
//
//		//function objValsToArr(ArrObj) {
//		//		var TagString = "";
//		//		var numObj = ArrObj.length;
//		//		for (var x = 0; x < numObj; x++) {
//		//				if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
//		//						TagString += ArrObj[x].html + ",";
//		//				}
//		//		}
//		//		return TagString.slice (0, -1);
//		//}
//		//
//		//function resetform () {
//		//		postService.user.question = "";
//		//		postService.user.author = "";
//		//		reset_tags();
//		//		alert ("Thank you for your submitting a question!");
//		//}
//
//		function postThisQ (form){
//						function objValsToArr (ArrObj) {
//								var TagString = "";
//								var numObj = ArrObj.length;
//								for (var x = 0; x < numObj; x++) {
//										if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
//												TagString += ArrObj[x].html + ",";
//										}
//								}
//								return TagString.slice (0, -1);
//						}
//
//						function resetform () {
//								postService.user.question = "";
//								postService.user.author = "";
//								reset_tags ();
//								alert ("Thank you for your submitting a question!");
//						}
//
//
//
//
//				postService.TagsStringhtml = objValsToArr (postService.Tags.tagdata);
//						postService.postedQ = {
//										'question': form.Qform.question.$viewValue,
//										'tags': postService.TagsStringhtml,
//										'author': form.Qform.author.$viewValue
//						};
//						var req = {
//										method: 'POST',
//										url: ROOT_HOST + PHPpost + 'LoadQ_DB.php',
//										headers: {'Content-Type': 'application/json'},
//										data: {'test': 'thisismytesttest'},
//										params: postService.postedQ
//						};
//								console.log (JSON.stringify (form.Qform.question));
//								$http (req)
//												.success (function (data) {
//										console.log ("here");
//										resetform ();
//										console.log (data);
//								})searchService
//		}
//
//}

function postService($http, ROOT_HOST, ROOT_PHP, PHPpost){
		alert('postService fired!!');
		var postforminit = {"question": "SomeDumbQuestionFrompostFactory", "author": "SomeDumbGuy"};
		function getalltags(){
				var req = {
						method: 'POST',
						url: ROOT_HOST + ROOT_PHP + 'grabtags.php',
						headers: {'Content-Type': 'application/json'}
				};
				return $http (req)
								.then (function (result) {
						  return result.data;
				});
		}

		function objValsToArr (ArrObj) {
				var TagString = "";
				var numObj = ArrObj.length;
				for (var x = 0; x < numObj; x++) {
						if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
								TagString += ArrObj[x].html + ",";
						}
				}
				return TagString.slice (0, -1);
		}
		function postThisQ(form,tags){
				var selectedtags = objValsToArr(tags)
				var formdata = {
						'question': form.question,
						'author': form.author,
						'tags': selectedtags
				};

				var req = {
										method: 'POST',
										url: ROOT_HOST + PHPpost + 'LoadQ_DB.php',
										headers: {'Content-Type': 'application/json'},
										data: {'test': 'thisismytesttest'},
										params: formdata
						};
				return $http (req)

		}
function resetform (){
		return {"question": "", "author": ""};
}
function thankyoumessage	(){
		alert('Thank You for you Submission.');
}
		function resetTags(Tags){
						var numObj = Tags.length;
						for (var x = 0; x < numObj; x++) {
								if ( Tags[x].hasOwnProperty ('selected') && Tags[x].selected === true ) {
										Tags[x].selected = false;
								}
						}
				return Tags;
				}

		return {
				postforminit: postforminit,
				getalltags: getalltags,
				postThisQ: postThisQ,
				objValsToArr: objValsToArr,
				resetform: resetform,
				thankyoumessage: thankyoumessage,
				resetTags: resetTags
		}
}
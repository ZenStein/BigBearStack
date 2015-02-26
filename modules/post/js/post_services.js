/**
 * Created by C-Styles on 2/25/15.
 */


function postService($http, ROOT_HOST, PHPpost, ROOTService){


		function reset_tags () {
				var numObj = postService.Tags.tagdata.length;
				for (var x = 0; x < numObj; x++) {
						if ( postService.Tags.tagdata[x].hasOwnProperty ('selected') && postService.Tags.tagdata[x].selected === true ) {
								postService.Tags.tagdata[x].selected = false;
						}
				}
		}

  function objValsToArr(ArrObj) {
				var TagString = "";
				var numObj = ArrObj.length;
				for (var x = 0; x < numObj; x++) {
						if ( ArrObj[x].hasOwnProperty ('selected') && ArrObj[x].selected === true ) {
								TagString += ArrObj[x].html + ",";
						}
				}
				return TagString.slice (0, -1);
  }

		function resetform () {
				postService.user.question = "";
				postService.user.author = "";
				reset_tags();
				alert ("Thank you for your submitting a question!");
		}


		var postService = this;
		postService.Tags = ROOTService.grabAllTags();
		postService.user = {"question": "My Great Q", "author": "Auth"};
		postService.postThisQ = function (form){
		postService.TagsStringhtml = objValsToArr (postService.Tags.tagdata);
		postService.postedQ = {
						'question': form.Qform.question.$viewValue,
						'tags': postService.TagsStringhtml,
						'author': form.Qform.author.$viewValue
		};
		var req = {
						method: 'POST',
						url: ROOT_HOST + PHPpost + 'LoadQ_DB.php',
						headers: {'Content-Type': 'application/json'},
						data: {'test': 'thisismytesttest'},
						params: postService.postedQ
		};
				console.log (JSON.stringify (form.Qform.question));
				$http (req)
								.success (function (data) {
						console.log ("here");
						resetform ();
						console.log (data);
				})
		}

}


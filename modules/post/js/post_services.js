/**
 * Created by C-Styles on 2/25/15.
 */

function postService($http, ROOT_HOST, ROOT_PHP, PHPpost){
	       	return{
				postforminit: postforminit,
				   getalltags: getalltags,
				     postThisQ: postThisQ,
				      resetform: resetform,
				 thankyoumessage: thankyoumessage,
				        resetTags: resetTags
		                    };

		var postforminit = {"question": "No Question Asked", "author": "Author"};
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
						    question: form.question,
						       author: form.author,
					          	tags: selectedtags
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
		  return {question: "", author: ""};
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

}
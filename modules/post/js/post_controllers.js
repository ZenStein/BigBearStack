/**
 * Created by C-Styles on 2/25/15.
 */

function post_ctrl_post_index ($location, $rootScope, $routeParams, postService){
	//	alert($location.absUrl());
		console.log ("post controller routeParam.question below");
		console.log ($routeParams.question);
		var postctrl = this;
		postctrl.Tags = {};
						postService.getalltags().then(function(result){
								postctrl.Tags = result;
						});
	//	postctrl.forminput = postService.postforminit;
		postctrl.forminput = {
																								question : $routeParams.question,
																								  author : '~Anonymous~',
																							timestamp :  new Date()
																								}
	//	postctrl.forminput.question = $routeParams.question;
		postctrl.postThisQ = function () {
				postService
								.postThisQ(postctrl.forminput, postctrl.Tags)
								.then(function(){
										postctrl.forminput = postService.resetform();
										postctrl.Tags = postService.resetTags(postctrl.Tags);
										postService.thankyoumessage();
										//$location.path('/search');
						    //$rootScope.$apply();
										history.back();
								});
		};
}
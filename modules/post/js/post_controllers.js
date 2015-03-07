/**
 * Created by C-Styles on 2/25/15.
 */

function post_ctrl_post_index (postService){
		//alert('PostController Init');
		var postctrl = this;
		postctrl.Tags = {};
						postService.getalltags().then(function(result){
								postctrl.Tags = result;
						});
		postctrl.forminput = postService.postforminit;

		postctrl.postThisQ = function () {
				postService
								.postThisQ(postctrl.forminput, postctrl.Tags)
								.then(function(){
										postctrl.forminput = postService.resetform();
										postctrl.Tags = postService.resetTags(postctrl.Tags);
										postService.thankyoumessage();
								});
		};
}
/**
 * Created by C-Styles on 2/25/15.
 */

function post_ctrl_post_index (postService){
		var postctrl = this;
		postctrl.Tags = postService.Tags;
		postctrl.user = postService.user;

		postctrl.postThisQ = function (form) {
				postService.postThisQ(form);
		};
}
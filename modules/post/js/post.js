/**
 * Created by C-Styles on 2/25/15.
 */
(function () {


		function post_config ($routeProvider) {
				$routeProvider
								.when ('/post', {
						templateUrl: 'modules/post/partials/post_index.html',
						controller: 'post_ctrl_post_index as Post_IndexCTRL'
				});
		}


		angular
						.module ('post', [])
						.constant('PHPpost','modules/post/PHP/post_PHP/')
						.config (post_config)
		    .controller ('post_ctrl_post_index', post_ctrl_post_index);

}) ();
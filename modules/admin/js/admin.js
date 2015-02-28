/**
 * Created by C-Styles on 2/25/15.
 */




(function(){


function admin_config($routeProvider){
		$routeProvider
						.when ('/admin', {
				templateUrl: 'modules/admin/partials/admin_index.html',
				controller: 'admin_ctrl_admin_index as Admin_IndexCTRL'
		})
						.when ('/admin/unanswered', {
				templateUrl: 'modules/admin/partials/unanswered.html',
				controller: 'admin_ctrl_unanswered as UnansweredCTRL'
		})
						.when ('/admin/unanswered/:qid_unanswered/createanswer', {
				templateUrl: 'modules/admin/partials/createanswer.html',
				controller: 'admin_ctrl_createanswer as CreateAnswerCTRL'
		});
}

		angular
				.module ('admin', [])
						.constant ('PHPadmin', 'admin_PHP/')
						.config (admin_config)
						.controller ('admin_ctrl_admin_index', admin_ctrl_admin_index)
						.controller ('admin_ctrl_unanswered', admin_ctrl_unanswered)
						.controller('admin_ctrl_createanswer', admin_ctrl_createanswer);



}) ();
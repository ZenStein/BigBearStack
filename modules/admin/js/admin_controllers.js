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

function admin_ctrl_createanswer($routeParams){
		this.tester = $routeParams.qid_unanswered;
		alert('firedddd');
		alert(this.tester);
}




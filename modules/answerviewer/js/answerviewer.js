/**
 * Created by C-Styles on 2/26/15.
 */


(function () {


		function answerviewer_config ($routeProvider) {
				$routeProvider
						.when ('/search/:qid', {
						templateUrl: 'modules/answerviewer/partials/answerviewer_index.html',
						controller: 'answerviewer_ctrl_answerviewer_index as AnswerViewerCTRL'
				})
		}

		angular
				.module ('answerviewer', [])
						.constant ('PHPanswerviewer', 'modules/answerviewer/PHP/answerviewer_PHP/')
						.config (answerviewer_config)
						.controller ('answerviewer_ctrl_answerviewer_index', answerviewer_ctrl_answerviewer_index)
						.controller('ModalInstanceCtrl', ModalInstanceCtrl)
						.factory('answerviewerFactory', answerviewerFactory)
						.service('answerviewerService', answerviewerService);


}) ();
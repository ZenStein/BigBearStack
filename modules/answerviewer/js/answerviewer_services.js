/**
 * Created by C-Styles on 2/26/15.
 */

function answerviewerFactory ($http, ROOT_HOST, PHPanswerviewer) {
		return {
				get: function (QorA, qid) {
						return $http.get (ROOT_HOST + PHPanswerviewer + "get" + QorA + ".php?qid=" + qid)
				}
		}
}

function answerviewerService (answerviewerFactory, $q) {
		var deferred = $q.defer ();
		var promise = deferred.promise;
		var service = this;
		service.data = {
				question: {},
				answers: {}
		};
		service.data.question = {};
		service.data.answers = {};
		this.activate = function (qid) {
				answerviewerFactory.get ("Q", qid)
								.then (function (result) {
						promise.question = result.data;
						service.data.question = promise.question;
						return answerviewerFactory.get ("A", qid)
				})
								.then (function (result2) {
						promise.answers = result2.data;
						service.data.answers = promise.answers;
						
						
				});
		};
}

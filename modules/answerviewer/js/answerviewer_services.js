/**
 * Created by C-Styles on 2/26/15.
 */

function answerviewerFactory ($http, ROOT_HOST, PHPanswerviewer) {
		return {
				get: function (QorA, qid) {
						return $http.get (ROOT_HOST + PHPanswerviewer + "get" + QorA + ".php?qid=" + qid);
				}
		};
}

function answerviewerService (answerviewerFactory, $q) {
		var answerviewerService = this;
		var deferred = $q.defer ();
		var promise = deferred.promise;

		answerviewerService.data = {
				question: {},
				answers: {}
		};

		this.activate = function (qid) {
				answerviewerFactory.get ("Q", qid)
								.then (function (result) {
						promise.question = result.data;
						answerviewerService.data.question = promise.question;
						return answerviewerFactory.get ("A", qid)
				})
								.then (function (result2) {
						promise.answers = result2.data;

                    answerviewerService.data.answers = promise.answers;
                    //JSON.parse(answerviewerService.data.answers);
                    //JSON.parse( answerviewerService.data.answers);

						
						
				});
		};
}

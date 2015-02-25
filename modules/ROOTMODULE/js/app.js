'use strict';

/* App Module */

(function(){
//this is a note on my local, checking to see if I am pushing correctly
  var app = angular.module('bigBearStack',['ngRoute','ui.bootstrap','admin']);
  app.constant ('ROOT_HOST', 'http://localhost/');
  app.constant ('ROOTMODULE_PHP', 'modules/ROOTMODULE/PHP/ROOTMODULE_PHP/');
  app.config (['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when ('/', {
          templateUrl: 'modules/ROOTMODULE/partials/search.html',
          controller: 'searchPanel as searchctrl'
        }).
        when ('/search', {
          templateUrl: 'modules/ROOTMODULE/partials/search.html',
          controller: 'searchPanel as searchctrl'
        }).
        when ('/search/:qid', {
          templateUrl: 'modules/ROOTMODULE/partials/viewQ.html',
          controller: 'Qviewctrl as Qviewerctrl'
        }).
        when ('/post', {
          templateUrl: 'modules/ROOTMODULE/partials/post.html',
          controller: 'QformCtrl as askctrl'
        }).
        when ('/featured', {
          templateUrl: 'modules/ROOTMODULE/partials/featured.html',
          controller: 'featuredController as featctrl'
        }).
        otherwise ({
          redirectTo: '/search'
        });
  }]);

  app.provider ("appSourcesPvdr", ["ROOT_HOST","ROOTMODULE_PHP", function (ROOT_HOST, ROOTMODULE_PHP) {
    function get () {
      var sayit = function () {
        alert ("isaidit");
      };
      var urls = {
      searchquery : ROOT_HOST + ROOTMODULE_PHP + "getSearchResults.php",
              getQ : "otherQsearch"
                    };
      return {
      ROOT_HOST: ROOT_HOST,
         sayit : sayit,
           urls : urls
                 };
    }
  return {
     $get : get
           };
  }]);
  app.factory ("appSources", ["appSourcesPvdr", '$http', function (appSourcesPvdr, $http) {
    appSourcesPvdr.getQsFromSearch = function (form) {
      var req = {
        method: 'POST',
        url: appSourcesPvdr.urls.searchquery,
        headers: {'Content-Type': 'application/json'},
        params: {'querystring': form.query}
      };
        return $http(req);
    };

    return appSourcesPvdr;
  }]);
  app.service('TagService', ['$http', 'ROOT_HOST', 'ROOTMODULE_PHP', function($http, ROOT_HOST, ROOTMODULE_PHP){
    this.tagFilters = {filterNames: []};
    this.grabAllTags = function(){
      var allTags = this;
      var req = {
        method :  'POST',
        url    :  ROOT_HOST + ROOTMODULE_PHP + 'grabtags.php',
        headers: {'Content-Type': 'application/json'}
      };
      $http(req)
      .success(function(jsondata){
        allTags.tagdata = jsondata;
      });
      return allTags;

    };
    this.setUnsetTagFilt = function (obj) { //alert(typeof obj)
      var tagNum = this.tagFilters.filterNames.length;
      var handl = this.tagFilters.filterNames;
      console.log ("handl= " + handl);
      console.log ("obj= " + obj);
      if ( tagNum === 0 ) {
        handl.push (obj);
        return 200;
      }
      for (var x = 0; x < tagNum; x++) {
        if ( handl[x] == obj ) {
          handl.splice (x, 1);
          console.log (handl);
          return 200;
        }
        if ( x == tagNum - 1 ) {
          handl.push (obj);
          console.log (handl);
          return 200;
        }
      }
      console.log ("Error: handl= " + handl);
      console.log ("Error: obj= " + obj);
      return "Error: Conditions were supposed to have been met";
    };
  }]);
  app.controller('searchPanel', ['appSources', 'TagService', function(appSources, TagService){
    var searchresults = this;
    this.Tags = TagService.grabAllTags();
    this.tagFilternames = TagService.tagFilters.filterNames;
    this.getQueryQs = function(form){

      appSources.getQsFromSearch (form)
          .success(function(result){
            console.log(result);
           searchresults.data = result;
          });
    };
    this.setUnsetTagFilt = function (obj) {
      TagService.setUnsetTagFilt(obj);
    };
  }]);
  app.controller('QformCtrl', ['$http', 'TagService', 'ROOT_HOST','ROOTMODULE_PHP', function($http, TagService, ROOT_HOST, ROOTMODULE_PHP) {
    var postQ = this;
    this.Tags = TagService.grabAllTags();
    this.user = {"question":/*searchObject.query*/"My Great Q","author":"Auth"};
    var tagToggler = {"class1":false,"class2":false,"class3":true};


    var objValsToArr = function(ArrObj){
      var TagString = "";
      var numObj=ArrObj.length;
      for(var x=0;x<numObj;x++){
        if(ArrObj[x].hasOwnProperty('selected') && ArrObj[x].selected === true){
          TagString += ArrObj[x].html + ",";
        }
      }
      return TagString.slice(0, -1);
    };

    function reset_tags () {
      var numObj = postQ.Tags.tagdata.length;
      for (var x = 0; x < numObj; x++) {
        if ( postQ.Tags.tagdata[x].hasOwnProperty ('selected') && postQ.Tags.tagdata[x].selected === true ) {
          postQ.Tags.tagdata[x].selected = false;
        }
      }
    }
    function resetform () {
      postQ.user.question = "";
      postQ.user.author = "";
      reset_tags();
      alert("Thank you for your submitting a question!");
    }
    this.postThisQ = function(form){

      this.TagsStringhtml = objValsToArr(this.Tags.tagdata);
      this.postedQ = {  
        'question' : form.Qform.question.$viewValue,
        'tags'     : this.TagsStringhtml,
        'author'   : form.Qform.author.$viewValue
      };
      var req = { 
        method :  'POST',
        url    :  ROOT_HOST + ROOTMODULE_PHP + 'LoadQ_DB.php',
        headers: {'Content-Type' : 'application/json'},
        data   : {'test' : 'thisismytesttest'},
        params : this.postedQ 
      };
      console.log(JSON.stringify(form.Qform.question));
      $http(req)
      .success(function(data){
            console.log("here");
            resetform();
        console.log(data);
      })
    };

  }]);
  app.controller('APlaceholder1', [function() {
    var pHolder = {"A":"1","B":"2","C":"3"};
  }]);
  app.controller('featuredController', [function() {
    this.items = ['Item 1', 'Item 2', 'Item 3'];
    this.addItem = function() {
      var newItemNo = this.items.length + 1;
      this.items.push('Item ' + newItemNo);
    };

  this.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  }]);
  app.controller('CPlaceholder2', [function() {
    var pHolder = {"A":"1","B":"2","C":"3"};
  }]);

  app.factory ('Qviewfactory', ['$http', 'ROOT_HOST', 'ROOTMODULE_PHP', function ($http, ROOT_HOST, ROOTMODULE_PHP) {


     return {
       get: function (QorA, qid) {
         return $http.get(ROOT_HOST+ ROOTMODULE_PHP + "get"+QorA+".php?qid="+qid)
         //    .then (function (result) {
           //console.log(result.data);
        //   return result.data;
        // });
       }
     }
  }]);
  app.service('Qviewservice', ['Qviewfactory', '$routeParams', '$q',  function(Qviewfactory, $routeParams, $q){

    var deferred = $q.defer();
    var promise = deferred.promise;
    var service = this;
     service.data = {
       question: {},
       answers: {}
     };
    service.data.question = {};
    service.data.answers = {};
    this.activate = function(qid ) {
      Qviewfactory.get ("Q", qid)
          .then (function (result) {
        promise.question = result.data;
        service.data.question = promise.question;
        return Qviewfactory.get ("A", qid)
      })
          .then (function (result2) {
        promise.answers = result2.data;
        service.data.answers = promise.answers;



      });
    };
  }]);
  app.controller('Qviewctrl', ['$scope', '$routeParams', '$log', '$modal', 'Qviewservice',  function( $scope, $routeParams, $log, $modal, Qviewservice) {
    console.log(Qviewservice);
    var Qview = this;
        Qview.init   = Qviewservice.activate ($routeParams.qid);
        Qview.package = Qviewservice.data;
    /************************/
    /*         ACCORDIAN    */
    /************************/

this.openshut = function(answerElem) {
  console.log(answerElem);
  var index = answerElem.$index;
  var thebool = answerElem.answer.isSelected;
  answerElem.answer.isSelected = !thebool;
  alert (answerElem.answer.isSelected);
  alert (answerElem.answer.content);
}
    $scope.oneAtATime = true;
      //
      //$scope.groups = [
      //  {
      //    title: 'Dynamic Group Header - 1',
      //    content: 'Dynamic Group Body - 1'
      //  },
      //  {
      //    title: 'Dynamic Group Header - 2',
      //    content: 'Dynamic Group Body - 2'
      //  }
      //];
      //
      //$scope.items = ['Item 1', 'Item 2', 'Item 3'];
      //
      //$scope.addItem = function () {
      //  var newItemNo = $scope.items.length + 1;
      //  $scope.items.push ('Item ' + newItemNo);
      //};
      //
      //$scope.status = {
      //  isFirstOpen: true,
      //  isFirstDisabled: false
      //};


    /************************/
     /*       ACCORDIAN       */
    /************************/
    Qview.addanswer = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/answermodalcontent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                questionid: function () {
                    return $scope.questionid;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

  }]);
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'questionid', '$routeParams', 'ROOT_HOST','ROOTMODULE_PHP', function ($scope, $modalInstance, $http, questionid, $routeParams, ROOT_HOST, ROOTMODULE_PHP) {
    $scope.author = "anyn";
    $scope.answercontent = "content here";
    $scope.questionid = $routeParams.qid;
    alert('id= '+ $scope.questionid);
    $scope.postanswer = function () {


        $scope.postedAns = {
          "author":$scope.author,
            "answercontent":$scope.answercontent,
            "qid": $scope.questionid
        };
        var req = {
            method :  'POST',
            url    :  ROOT_HOST+ ROOTMODULE_PHP + 'LoadAns_DB.php',
            headers: {'Content-Type' : 'application/json'},
            data   : {'test' : 'thisismytesttest'},
            params : $scope.postedAns
        };
        $http(req)
            .success(function(data){
              console.log(data);
            });
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
})();






  


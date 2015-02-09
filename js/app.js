'use strict';

/* App Module */

(function(){
//this is a note on my local, checking to see if I am pushing correctly
  var app = angular.module('bigBearStack',['ngRoute','ui.bootstrap']);
  
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'partials/search.html',
      controller: 'searchPanel as searchctrl'
    }).
    when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'searchPanel as searchctrl'
    }).
    when('/search/:qid', {
      templateUrl: 'partials/viewQ.html',
      controller: 'viewQctrl as Qviewerctrl'
    }).
    when('/post', {
      templateUrl: 'partials/post.html',
      controller: 'QformCtrl as askctrl'
    }).
    when('/featured', {
      templateUrl: 'partials/featured.html',
      controller: 'featuredController as featctrl'
    }).
    otherwise({
      redirectTo: '/search'
    });
  }]);
  
  app.service('DataContainer', ['$http', function($http){
    this.getAllQs = function(){
      var getData = this;
      var req = { 
        method : 'POST',
        url    : 'http://localhost/BigBearStack/OutputTenLatestQuestions.php',
        headers:{'Content-Type':'application/json'},
        data   :{},
        params :{}
      };
      $http(req)
      .success(function(jsondata, status){ 
        console.log("jsondata= "+jsondata);
        getData.data= jsondata;
      }); 
      return getData;                     
    };
    this.getQsFromSearch = function(form){
      var resultData = this;
      var req = { 
        method :  'POST',
        url    :  'http://localhost/BigBearStack/getSearchResults.php',
        headers: {'Content-Type': 'application/json'},
        data   : {'userquery': "gege"},
        params : {'querystring':form.query}
      };
      $http(req)
      .success(function(jsondata, status){ 
        resultData.data= jsondata;
      }); 
      return resultData;      
    };                  
                            
  }]);
  
  app.service('allTagsJSON', ['$http', function($http){
    this.grabAllTags = function(){
      var allTags = this;
      var req = { 
        method :  'POST',
        url    :  'http://localhost/BigBearStack/grabtags.php',
        headers: {'Content-Type': 'application/json'}
      };
      $http(req)
      .success(function(jsondata){ 
        allTags.tagdata = jsondata;
      }); 
      return allTags;
    };    
  }]);

  app.service('getQ', ['$http', function($http){
    this.getTheQ = function(qid){
      var theQ = this;
      var req = { 
        method :  'POST',
        url    :  'http://localhost/BigBearStack/getQ.php',
        headers: {'Content-Type': 'application/json'},
        params : {'qid':qid}
      };
      $http(req)
      .success(function(jsondata){ 
        theQ.Qdata = jsondata;
      }); 
      return theQ;
    };    
  }]);  
  app.controller('searchPanel', ['DataContainer', 'allTagsJSON', '$location', function(DataContainer, allTagsJSON, $location){
    this.Tags = allTagsJSON.grabAllTags();
    this.tagFilters = {"filterNames":[]};
    this.getQueryQs = function(form){
    this.searchresults = DataContainer.getQsFromSearch(form);
    };
   var resObj = [];
   this.mytest = function(x){ console.log(JSON.stringify(x)); };
   this.setUnsetTagFilt = function(obj){ //alert(typeof obj)
     var tagNum = this.tagFilters.filterNames.length;
     var handl = this.tagFilters.filterNames; 
     console.log("handl= "+handl);    
     console.log("obj= "+obj);
     if(tagNum == 0){
       handl.push(obj);
       return 200;
     }
     for(var x=0;x<tagNum;x++){
        if(handl[x] == obj){
          handl.splice(x, 1);
          console.log(handl);
          return 200;    
        }
        if(x == tagNum-1){
          handl.push(obj);
          console.log(handl);
          return 200;      
        }
     }
     console.log("Error: handl= "+handl);    
     console.log("Error: obj= "+obj);
     return "Error: Conditions were supposed to have been met";
     };
        
//         this.tagFilters.filterNames.push(obj);
//         alert(this.tagFilters.filterNames.length);
         //alert(this.tagFilters.filterNames.hasOwnProperty(obj));
     //    var temp = {};
//         temp[obj] = "false";
//   this.tagFilters.filterNames.push(temp);
//       for (var key in obj) {
//       var temp = {};
//       temp[key] = obj[key];
//       this.tagFilters.filterNames.push(temp);
//     }
//     console.log(JSON.stringify(this.tagFilters.filterNames));
 this.gosomewhere = function(x){ var url = $location.url('/post?query='+x);}  
  }]);
  
  app.controller('QformCtrl', ['$http', 'allTagsJSON','$location', function($http, allTagsJSON, $location) {
    var searchObject = $location.search();
    //alert(JSON.stringify(searchObject));
    this.Tags = allTagsJSON.grabAllTags();
    this.user = {"question":searchObject.query,"author":"Auth"};
    var tagToggler = {"class1":false,"class2":false,"class3":true};
    this.changeclass = function(x){alert(tagToggler.class1);};
    var objValsToArr = function(ArrObj){
      var TagString = "";
      var numObj=ArrObj.length;
      for(var x=0;x<numObj;x++){
        if(ArrObj[x].hasOwnProperty('selected') && ArrObj[x].selected == true){
          TagString += ArrObj[x].html + ",";
        }
      }
      var finalTagString = TagString.slice(0, -1);
      return finalTagString;
    };
    this.postThisQ = function(form){ 
      this.TagsStringhtml = objValsToArr(this.Tags.tagdata);
      this.postedQ = {  
        'question' : form.Qform.question.$viewValue,
        'tags'     : this.TagsStringhtml,
        'author'   : form.Qform.author.$viewValue
      };
//      console.log(JSON.stringify(form.Qform.question.$viewValue));
//      console.log(JSON.stringify(form.Qform.author.$viewValue));
//      console.log(JSON.stringify(this.postedQ));
      var req = { 
        method :  'POST',
        url    :  'http://localhost/BigBearStack/LoadQ_DB.php',
        headers: {'Content-Type' : 'application/json'},
        data   : {'test' : 'thisismytesttest'},
        params : this.postedQ 
      };
      console.log(JSON.stringify(form.Qform.question));
      $http(req)
      .success(function(data){ 
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
  
  app.controller('CPlaceholder2', [,function() {
    var pHolder = {"A":"1","B":"2","C":"3"};
  }]);
  
  app.controller('viewQctrl', ['$routeParams', 'getQ', function($routeParams, getQ) {
    console.log('init-viewQctrl');    
    this.questionID = $routeParams.qid;
    this.Qpackage = getQ.getTheQ(this.questionID);
    this.data = this.Qpackage.Qdata;
    console.log('PACKAGE:  '+JSON.stringify(this.Qpackage));
  }]);

})();




  


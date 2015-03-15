/**
 * Created by C-Styles on 2/25/15.
 */




(function(){
		angular
            .module ('admin', [])
            .constant ('PHPadmin', 'modules/admin/PHP/admin_PHP/')
            .config (admin_config)
            .controller ('admin_ctrl_admin_index', admin_ctrl_admin_index)
            .controller ('admin_ctrl_unanswered', admin_ctrl_unanswered)
            .controller ('admin_ctrl_createanswer', admin_ctrl_createanswer)
            .service('adminService_images', adminService_images)
            .service("adminService_bullets", adminService_bullets)
            .service ("adminService_links", adminService_links)
            .service('createanswerService', createanswerService);





function admin_config($routeProvider){
		$routeProvider
						.when ('/admin', {
				templateUrl: 'modules/admin/partials/admin_index.html',
				controller: 'admin_ctrl_admin_index as Admin_IndexCTRL'
		})
      .when ('/admin/allquestions', {
    templateUrl: 'modules/admin/partials/admin_getallQs.html',
    controller: 'admin_getallQsController as allCTRL'
  })
						.when ('/admin/unanswered', {
				templateUrl: 'modules/admin/partials/admin_unanswered.html',
				controller: 'admin_ctrl_unanswered as UnansweredCTRL'
		})
						.when ('/admin/unanswered/:qid_unanswered/createanswer', {
				templateUrl: 'modules/admin/partials/admin_createanswer.html',
				controller: 'admin_ctrl_createanswer as CreateAnswerCTRL'
		});
}

function admin_ctrl_admin_index () {
				var thisistest = {};

				thisistest.testname = "mike";
				this.tosee = thisistest.testname;
		}

function admin_ctrl_unanswered ($http, ROOT_HOST, PHPadmin) {
				var unanswered = this;
            unanswered.data = {
                qid:"777",
                q_title:'somedummy title'
            };
            $http.get(ROOT_HOST + PHPadmin +'getunanswered.php')
                .then(function(result){
                    unanswered.data = result.data;
                  console.log(unanswered.data);
                });
		}

function createanswerService(ROOT_HOST, $http, PHPadmin, $routeParams) {
  return {
      registrationkey:"empty",
    postthisanswer: postthisanswer,
    stringifyObj: stringifyObj,
    getquestion: getquestion,
      getregistered:getregistered,
      setkey:setkey,
      getkey:getkey,
      setimgpathname:setimgpathname,
      getimgpathname:getimgpathname
  };
          function setimgpathname(newvalue){
           this.pathname = newvalue;
             }
      function getimgpathname(){
          return this.pathname;
      }
    function setkey(key){
        this.registrationkey = key;
    }
    function getkey(){
        return this.registrationkey;
    }
  function getregistered(qid){
      console.log('getreg');
      return $http.get(ROOT_HOST+PHPadmin+'getregistered.php?qid='+qid)
          .then(function(result){
              var qid = $routeParams.qid_unanswered;
              var key = result.data;
              var pathname = ROOT_HOST + "images/answers/" +qid+ "/" +key;
              setkey(key);
              setimgpathname(pathname);
              console.log('getreg2');
              return key;
          });
  }
    function stringifyObj(obj){
    return JSON.stringify(obj);
  }
  function postthisanswer (key, input, images, bulletdata, bullettype, links) {
     //alert(JSON.stringify(bulletdata));
      console.log('input before being sent to php');
      console.log(input);
      var answerdata = {
                   key:key,
                    qid: input.qid,
                  images:images,
                   title: input.title,
                   author: input.author,
              answerheader: input.answerheader,
                  bulletdata: bulletdata,
                   bullettype: bullettype,
                         links: links,
                               };
      var req = {
        method: 'POST',
        url: ROOT_HOST + PHPadmin + 'postthisanswer.php',
        headers: {'Content-Type': 'application/json'},
        params: answerdata,
          data:answerdata
      };
      return  $http (req).then(function(result){
                console.log("postthisanswer result below");
                console.log (result.data);
                return result;
               });
  }
  function getquestion(){
    var req = {
      method: 'POST',
      url: ROOT_HOST + 'modules/answerviewer/PHP/answerviewer_PHP/getQ.php',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      params: {qid:$routeParams.qid_unanswered},
    };
    return $http (req).then (function (result) {
      console.log ("getQresult below");
      console.log (result.data);
      return result.data;
    });
  }
//  for reference only!!
  //function postThisQ (form, tags) {
  //  var selectedtags = objValsToArr (tags)
  //  var formdata = {
  //    question: form.question,
  //    author: form.author,
  //    tags: selectedtags
  //  };
  //  var req = {
  //    method: 'POST',
  //    url: ROOT_HOST + PHPpost + 'LoadQ_DB.php',
  //    headers: {'Content-Type': 'application/json'},
  //    data: {'test': 'thisismytesttest'},
  //    params: formdata
  //  };
  //  return $http (req)
  //}
}

function admin_ctrl_createanswer ($scope, $http, $routeParams,adminService_images, adminService_bullets, adminService_links, createanswerService) {
 var CTRL = this;
     CTRL.createansService = createanswerService;
     CTRL.registrationkey = "";
     CTRL.input = {
               title:"heres title",
         answerheader:"this is header",
                author:"i am author",
                    qid: $routeParams.qid_unanswered
                        };
     CTRL.questiondata = {};
     CTRL.bulletobj = adminService_bullets;
     CTRL.linkobj = adminService_links;
     CTRL.imageobj = adminService_images;
     /*
    $http.get('http://host.com/first')
   .then(function(result){
    //post-process results and return promise from the next call
    myPostProcess1(result.data);
    return $http.get('http://host.com/second');
   })
   .then(function(secondCallResult){
     //do something where the second (and the last) call finished
   });
    * */

     CTRL.createansService.getregistered($routeParams.qid_unanswered)
         .then(function(result){
        console.log('createansService.getregistered result');
        console.log(result);
        CTRL.registrationkey = result;
        return CTRL.createansService.getquestion();}).then(function(result){
          CTRL.questiondata = result;
          return CTRL.imageobj.makeimagedir($routeParams.qid_unanswered,CTRL.registrationkey);}).then(function(result){
            return CTRL.imageobj.http_get__Arr_image_obj($routeParams.qid_unanswered,CTRL.registrationkey);}).then(function(result){
              console.log('imageobj.http_get__Arr_image_obj result');
              console.log(result);
              if(result == 'FALSE'){CTRL.imageobj.setdefault_Arr_image_objs();}
              if(result != 'FALSE'){CTRL.imageobj.set_Arr_image_objs(result);}

      });

     CTRL.uploadFile = function (files) {
      CTRL.imageobj.uploadfile(files, $routeParams.qid_unanswered, CTRL.registrationkey)
        .success(function(result){
          console.log('upload file success result');
              console.log(result);
              CTRL.imageobj.add_Arr_image_objs (result);
        })
        .error (function () {
          console.log ('...DAMN !...');
        });
    };

     CTRL.postthisanswer = function (){
        var key = CTRL.registrationkey;
      var inputs = CTRL.input;
      var images = CTRL.imageobj.getArr_image_objs_tostring();
      var bullets = CTRL.bulletobj.bulletdata_tostring();
      var bullettype = CTRL.bulletobj.getbullettype();
      var links= CTRL.linkobj.ArrObjs_toString();
      CTRL.createansService.postthisanswer(key, inputs, images, bullets, bullettype, links);
    };
}

function adminService_images($http, ROOT_HOST, $routeParams){
    return {
                 Arr_image_objs: [],
                       pathname:"default",
             set_Arr_image_objs: set_Arr_image_objs,
      setdefault_Arr_image_objs:setdefault_Arr_image_objs,
             add_Arr_image_objs: add_Arr_image_objs,
          remove_Arr_image_objs: remove_Arr_image_objs,
        http_get__Arr_image_obj:http_get__Arr_image_obj,
                     uploadfile: uploadfile,
     getArr_image_objs_tostring: getArr_image_objs_tostring,
                   makeimagedir:makeimagedir
    };

    function setdefault_Arr_image_objs() {
        var arr_image_objs = [{
            image: 'default.png',
            text: 'pic decription,',
            qid: 'default',
            key: 'default'

        }];
        this.Arr_image_objs = arr_image_objs;
    }

    function makeimagedir(qid,key){
            var req = {
                    method: 'POST',
                        url: ROOT_HOST +'makeimagedir.php',
                     headers: {'Content-Type': 'application/json'},
                       params:{qid:qid,key:key}
                               };
            return $http (req).then (function (result) {
                                console.log("makedir.php response result");
                                console.log(result);
                                return result.data;
                               });
          }

    function http_get__Arr_image_obj(qid,key){
            var req = {
                    method: 'POST',
                        url: ROOT_HOST +'/getimagelist.php',
                     headers: {'Content-Type': 'application/json'},
                       params:{qid:qid,key:key}
                               };
            return $http (req).then (function (result) {
                                console.log("http_get__Arr_image_obj result below");
                                console.log(result);
                                return result.data;
                               });
          }

    function set_Arr_image_objs(value){
              console.log('set_Arr_image_objs  type of param');
              console.log( typeof value);
              if(typeof value == "object"){
                var temp = [];
                    temp.push(value);
                this.Arr_image_objs = temp;
              }
              else if(typeof value == "array"){
                  this.Arr_image_objs = value;
              }
          }

    function add_Arr_image_objs(image_obj){
                console.log('this.Arr_image_objs[0].image');
                console.log(this.Arr_image_objs[0].image);
                console.log('param add_Arr');
                console.log(image_obj);
                if(this.Arr_image_objs[0].image == 'default.png'){
                  this.set_Arr_image_objs(image_obj);
              }
              else{
              this.Arr_image_objs.push(image_obj);
            }
            }

    function remove_Arr_image_objs(){
          this.Arr_image_objs.pop();
        }

    function uploadfile(files, qid, key){
             // var qid = $routeParams.qid_unanswered;
              var fd = new FormData ();
            //Take the first selected file
            fd.append ('myfile', files[0]);

            var uploadUrl = ROOT_HOST + "upload.php?qid="+qid+"&key="+key;
            return $http.post (uploadUrl, fd, {
              withCredentials: true,
              headers: {'Content-Type': undefined},
              transformRequest: angular.identity
            })
            //    .success (function (result) {
            //  // setAnswerImages (result);
            //  console.log ('upload file succes result below');
            //  console.log (result);
            //  this.add_Arr_image_objs(result);
            //})
            //    .error (function () {
            //  console.log ('...DAMN !...');
            //});


          }

    function getArr_image_objs_tostring(){
        //  var imgobj_tostring = JSON.stringify (this.Arr_image_objs, ['image', 'text']);
        //  return imgobj_tostring;
        return JSON.stringify(this.Arr_image_objs);
        }

}

function adminService_bullets(){
  return{
    addbullet: addbullet,
    removebullet: removebullet,
    togglebullettype: togglebullettype,
    bulletdata_tostring: bulletdata_tostring,
    getbullettype: getbullettype,
    bullettype: "unordered",
    numbullets: numbullets,
    Arr_bullettext: []
  };
  var numbullets = 0;

  function addbullet(){
    var length = this.Arr_bullettext.length;
    var index = length+1;
    var bullet_OBJ = {
      index: index,
      text: ""
    }
    this.Arr_bullettext.push(bullet_OBJ);
  }
  function removebullet(){
    this.numbullets -= 1;
    this.Arr_bullettext.pop();

  }
  function togglebullettype(){
    var currentype = this.bullettype;
    var setype = (currentype == "unordered" ? "ordered" : "unordered");
    this.bullettype = setype;
  }
  function bulletdata_tostring(){
    var bulletsobjtostring = JSON.stringify(this.Arr_bullettext, ['index','text']);
    //var bullettype = this.bullettype;
    //var tempobj = {
    //  bulletsobjtostring: bulletsobjtostring,
    //  bullettype: bullettype
    //};
    //var tempobj_tostring = JSON.stringify(tempobj);
    return bulletsobjtostring;
    //this.bulletdata = this.Arr_bullettext;
    //this.bullettype = this.bullettype
    //bulletdata.push ({bullettype: bullettype});
    //var bulletdata_tostring = JSON.stringify (bulletdata, ['index', 'text', 'bullettype']);
    //return bulletdata_tostring;
  }
  function getbullettype(){
    var bullettype = this.bullettype;
    return bullettype;
  }

}

function adminService_links(){
    return {
      addlink: addlink,
      removelink: removelink,
      Arr_link_objs: [],
      ArrObjs_toString: ArrObjs_toString
    };


    function addlink () {
      var length = this.Arr_link_objs.length;
      var index = length + 1;
      var link_OBJ = {
        index: index,
        linktext: "",
        linkurl:""
      }
      this.Arr_link_objs.push (link_OBJ);
    }

    function removelink () {
      this.numlinks -= 1;
      this.Arr_link_objs.pop ();

    }

   function ArrObjs_toString(){
     var objtostring= JSON.stringify (this.Arr_link_objs, ['linktext', 'linkurl']);
     return objtostring;
   }

  }
}) ();
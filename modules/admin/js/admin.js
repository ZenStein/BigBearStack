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
    postthisanswer: postthisanswer,
    stringifyObj: stringifyObj,
    getquestion: getquestion
  };
  function stringifyObj(obj){
    return JSON.stringify(obj);
  }
  function postthisanswer (input, images, bulletdata, bullettype, links) {
     var answerdata = {
                    qid: input.qid,
                   title: input.title,
                   author: input.author,
              answerheader: input.answerheader,
                     images: images,
                  bulletdata: bulletdata,
                   bullettype: bullettype,
                         links: links,
                               };
      var req = {
        method: 'POST',
        url: ROOT_HOST + PHPadmin + 'postthisanswer.php',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        params: answerdata,
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
    CTRL.input = {
      title:"heres title",
      answerheader:"this is header",
      author:"i am author",
      qid: $routeParams.qid_unanswered
    };
    CTRL.questiondata = {};
    //CTRL.title = "titlehere from controller";
    //CTRL.header = "header from controller";
    //CTRL.qid = "777";//$routeParams.qid;
    CTRL.bulletobj = adminService_bullets;
    CTRL.linkobj = adminService_links;
    CTRL.imageobj = adminService_images;
   // CTRL.author = "";
    CTRL.createansService = createanswerService;

    CTRL.createansService.getquestion()
      .then(function(result){
          CTRL.questiondata = result;
        });

    CTRL.imageobj.http_get__Arr_image_obj()
      .then(function(result){
        CTRL.imageobj.set_Arr_image_obj(result);
		   });

    CTRL.uploadFile = function (files) {
      CTRL.imageobj.uploadfile(files)
        .success(function(result){
          CTRL.imageobj.add_Arr_image_objs (result);
        })
        .error (function () {
          console.log ('...DAMN !...');
        });
    };

    CTRL.postthisanswer = function (){
      var inputs = CTRL.input;
      var imagedata_tostring = CTRL.imageobj.getimageobj_tostring();
      var bulletdata_tostring = CTRL.bulletobj.bulletdata_tostring();
      var bullettype = CTRL.bulletobj.getbullettype();
      var linkobj_tostring = CTRL.linkobj.ArrObjs_toString();
      CTRL.createansService.postthisanswer(inputs, imagedata_tostring, bulletdata_tostring, bullettype, linkobj_tostring);
    };
  }
//function adminFactory_images($http, ROOT_HOST){
//  return {
//    $get:get
//  };
//  function get(){
//    //var imagearray = this;
//    var req = {
//      method: 'GET',
//      url: ROOT_HOST + '/getimagelist.php',
//      headers: {'Content-Type': 'application/json'}
//    };
//
//   return $http (req)
//        .then (function (result) {
//      console.log ("log is result below");
//      console.log (result);
//      //imagearray.data = result.data;
//       return result.data;
//      //set_Arr_image_obj (result.data);
//    });
//    //return imagearray.data;
//  }
//
//}
  function adminService_images($http, ROOT_HOST){
// var arrayobjtest =this;
      //var req = {
      //  method: 'GET',
      //  url: ROOT_HOST + '/getimagelist.php',
      //  headers: {'Content-Type': 'application/json'}
      //};
      ///*return*/
      //$http (req)
      //    .then (function (result) {
      //  console.log ("log is result below");
      //  console.log (result);
      //  // return result.data;
      //  set_Arr_image_obj (result.data);
      //});
    //adminFactory_images.$get ().then (function (result) {
    //  console.log ('inside service ,then from fact');
    //  console.log (result);
    //  arrayobjtest.data = result;
    //});



    return          {
            Arr_image_objs: Arr_image_objs,
            set_Arr_image_obj: set_Arr_image_obj,
          add_Arr_image_objs: add_Arr_image_objs,
          remove_Arr_image_objs: remove_Arr_image_objs,
        http_get__Arr_image_obj:http_get__Arr_image_obj,
                      uploadfile: uploadfile,
      getimageobj_tostring: getimageobj_tostring
                                 };


             var Arr_image_objs =   [{
            name:'default.png',
            text:'this is the default text from admin service'
                  }];

       function http_get__Arr_image_obj(){
				var req = {
										method: 'GET',
										    url: ROOT_HOST +'/getimagelist.php',
									  headers: {'Content-Type': 'application/json'}
								           };
				return $http (req)
						.then (function (result) {
                    console.log("log is result below");
				  console.log(result);
                    return result.data;
				  });
		}

        function set_Arr_image_obj(Arr_objs){
            this.Arr_image_objs = Arr_objs;
        }

        function add_Arr_image_objs(image_obj){
          this.Arr_image_objs.push(image_obj);
        }
    function remove_Arr_image_objs(){
      this.Arr_image_objs.pop();
    }


      function uploadfile(files){

          var fd = new FormData ();
        //Take the first selected file
        fd.append ("myfile", files[0]);

        var uploadUrl = "http://localhost/upload.php";
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
    function getimageobj_tostring(){
      var imgobj_tostring = JSON.stringify (this.Arr_image_objs, ['image', 'text']);
      return imgobj_tostring;
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
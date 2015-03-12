/**
 * Created by C-Styles on 2/25/15.
 */




(function(){
		angular
						.module ('admin', [])
						.constant ('PHPadmin', 'admin_PHP/')
						.config (admin_config)
						.controller ('admin_ctrl_admin_index', admin_ctrl_admin_index)
						.controller ('admin_ctrl_unanswered', admin_ctrl_unanswered)
						.controller ('admin_ctrl_createanswer', admin_ctrl_createanswer)
                        .service('adminService_images', adminService_images)
      .service("adminService_bullets", adminService_bullets)
      .service ("adminService_links", adminService_links);;





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

		function admin_ctrl_unanswered (ROOT_HOST, PHPadmin) {
				var thisistest = {};
				thisistest.testname = ROOT_HOST + PHPadmin;
				this.tosee = thisistest.testname;
		}

		function admin_ctrl_createanswer ($scope, $http, adminService_images, adminService_bullets, adminService_links) {
    var CTRL = this;
    CTRL.Srvc_EB = adminService_bullets;
    CTRL.linkobjs = adminService_links;
    CTRL.answerimages = adminService_images.Arr_image_objs;

    adminService_images.http_get__Arr_image_obj().then(function(result){
              adminService_images.set_Arr_image_obj(result);
              CTRL.answerimages = adminService_images.Arr_image_objs;
		  });

    CTRL.uploadFile = function (files) {
            //var fd = new FormData ();
            ////Take the first selected file
            //fd.append ("myfile", files[0]);
            //
            //var uploadUrl = "http://localhost/upload.php";
            //$http.post (uploadUrl, fd, {
            //        withCredentials: true,
            //        headers: {'Content-Type': undefined},
            //        transformRequest: angular.identity
            //}).success (function(result){
            //   adminService_images.set_Arr_image_obj(result);
            //  CTRL.answerimages = adminService_images.Arr_image_objs;
            //
            //  })
            //.error (function(){console.log ('...DAMN !...');});
      adminService_images.uploadfile(files).success(function(result){
        adminService_images.add_Arr_image_objs (result);
      });

    };
		}

  function adminService_images($http, ROOT_HOST){
        return          {
            Arr_image_objs:Arr_image_objs,
            set_Arr_image_obj: set_Arr_image_obj,
          add_Arr_image_objs: add_Arr_image_objs,
          remove_Arr_image_objs: remove_Arr_image_objs,
        http_get__Arr_image_obj:http_get__Arr_image_obj,
                      uploadfile: uploadfile
                                 };

        var Arr_image_objs = [{
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
    }
function adminService_bullets(){
  return{
    addbullet: addbullet,
    removebullet: removebullet,
    togglebullettype: togglebullettype,
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

}
  function adminService_links(){
    return {
      addlink: addlink,
      removelink: removelink,
      Arr_link_objs: []
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


  }
}) ();
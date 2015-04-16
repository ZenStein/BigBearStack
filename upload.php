<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/5/15
 * Time: 9:37 AM
 */

//var_dump($_FILES);
include $_SERVER['DOCUMENT_ROOT'] . '/BigBearStack/PHP_includes/functions.php';

function removehiddenfiles($Filenames_Arr){
  $filterednames = [];
    for($x=3;$x<count($Filenames_Arr);$x++){
        array_push($filterednames, $Filenames_Arr[$x]);
    }
    return $filterednames;
}

//function createUniqueDir($qid){
//
//   $x = 0;
//   $uniqueDir ="images/answers/$qid";
//    do{
//
//       if($x !=0){
//        $uniqueDir = "images/answers/$qid" . "_" . $x;
//       }
//        $x++;
//    }while(is_dir($uniqueDir));
//    return $uniqueDir;
//}
$key = $_REQUEST['key'];
$qid = $_REQUEST['qid'];


$qidimagedir = 'images/answers/' . $qid;
$imagedir = 'images/answers/' . $qid . '/' . $key;
if(!is_dir($qidimagedir)){
    if(mkdir($qidimagedir)){
       if(mkdir($imagedir)){
          //success!!
       }else {echo "couldn't make the directory "; exit;}
    }else {echo "couldn't make the directory "; exit;}
}else if(is_dir($qidimagedir)){
   if(!is_dir($imagedir)){
       if(mkdir($imagedir)){
         //success!!
       }else {echo "couldn't make the directory "; exit;}
   }else if(is_dir($imagedir)){/* valid pre existing filepath, upload time! */}
}




//else{echo 'img directory already exists'; exit; }




$uploaddir = 'images/answers/' . $qid . '/' . $key;
$uploadedfilename = $uploaddir . '/' . basename($_FILES['myfile']['name']);

if(move_uploaded_file($_FILES['myfile']['tmp_name'], $uploadedfilename)) {
    $filename = basename($_FILES['myfile']['name']);
    echo  json_encode(["image"=>$filename,"text"=>"$filename default", "qid"=>$qid,"key"=>$key]);
}else {
   echo "Upload failed";
 }




?>

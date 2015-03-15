<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/5/15
 * Time: 9:37 AM
 */

//var_dump($_FILES);
include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';

//function get_uploaded_file($uploaded_filename, $qid, $key)
//{
//    $removefromurl = '?qid=' . $qid . '&key=' . $key;
// if(isset($_FILES[$uploaded_filename]["name"]))
//{
//  if($_FILES[$uploaded_filename]["name"] != "")
//  {
//    $uploaddir = 'images/';
//    $uploadedfilename = $uploaddir . basename($_FILES[$uploaded_filename]['name'], $removefromurl);
//
//    if(!move_uploaded_file($_FILES[$uploaded_filename]['tmp_name'], $uploadedfilename)){die("upload Error");}
//
//    $theuploadedfile = file_get_contents($uploadedfilename);
//    //$strippedtheuploadedfile = htmlspecialchars($theuploadedfile);
//    return $theuploadedfile;
//  }else{return false;}
//}else{return false;}
//}

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

//echo basename('http://localhost/upload.php?qid=6&key=49', '?qid=6&key=4');
/*******************************/


$key = $_REQUEST['key'];
$qid = $_REQUEST['qid'];
$myfilename = $key;
$uploaddir = 'images/answers/' . $qid . '/' . $key;
$uploadedfilename = $uploaddir . '/' . basename($_FILES['myfile']['name']);

if(move_uploaded_file($_FILES['myfile']['tmp_name'], $uploadedfilename)) {
    $filename = basename($_FILES['myfile']['name']);
    echo  json_encode(["image"=>$filename,"text"=>"$filename default", "qid"=>$qid,"key"=>$key]);
}else {
   echo "Upload failed";
 }


//$imagefile = get_uploaded_file('myfile', $qid, $key);
//$putfile = $uploaddir . '/' . $filename;
//if(file_put_contents($putfile, $imagefile)){
 // echo "successsfull Upload";
//}

?>

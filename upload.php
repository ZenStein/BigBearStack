<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/5/15
 * Time: 9:37 AM
 */


function get_uploaded_file($uploaded_filename)
{
 if(isset($_FILES[$uploaded_filename]["name"]))
{
  if($_FILES[$uploaded_filename]["name"] != "")
  {
    $uploaddir = '/tmp/';
    $uploadfile = $uploaddir . basename($_FILES[$uploaded_filename]['name']);

    if(!move_uploaded_file($_FILES[$uploaded_filename]['tmp_name'], $uploadfile)){die("upload Error");}

    $theuploadedfile = file_get_contents($uploadfile);
    //$strippedtheuploadedfile = htmlspecialchars($theuploadedfile);
    return $theuploadedfile;
  }else{return false;}
}else{return false;}
}

function removehiddenfiles($Filenames_Arr){
  $filterednames = [];
    for($x=3;$x<count($Filenames_Arr);$x++){
        array_push($filterednames, $Filenames_Arr[$x]);
    }
    return $filterednames;
}
$uploaddir = 'images/';
$uploadfile = $uploaddir . basename($_FILES['myfile']['name']);



if (move_uploaded_file($_FILES['myfile']['tmp_name'], $uploadfile)) {
    $dir    = 'images';
    $rawfilesnames = scandir($dir);
    $filenames = removehiddenfiles($rawfilesnames);
    $filenames_objArr = [];
    for($x=0;$x<count($filenames);$x++){
        $filenames_objArr[$x] = json_encode(["imagename"=>$filenames[$x]]);
    }

    echo "[" . implode(',',$filenames_objArr) . "]";
} else {
   echo "Upload failed";
}

//$image = get_uploaded_file('myfile');
//file_put_contents('images/'$image);


//$tempDir = __DIR__ . DIRECTORY_SEPARATOR . 'temp';
//if (!file_exists($tempDir)) {
//	mkdir($tempDir);
//}
//if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//	$chunkDir = $tempDir . DIRECTORY_SEPARATOR . $_GET['flowIdentifier'];
//	$chunkFile = $chunkDir.'/chunk.part'.$_GET['flowChunkNumber'];
//	if (file_exists($chunkFile)) {
//		header("HTTP/1.0 200 Ok");
//	} else {
//		header("HTTP/1.0 404 Not Found");
//	}
//}
//// Just imitate that the file was uploaded and stored.
//sleep(2);
//echo json_encode([
//    'success' => true,
//    'files' => $_FILES,
//    'get' => $_GET,
//    'post' => $_POST,
//    //optional
//    'flowTotalSize' => isset($_FILES['file']) ? $_FILES['file']['size'] : $_GET['flowTotalSize'],
//    'flowIdentifier' => isset($_FILES['file']) ? $_FILES['file']['name'] . '-' . $_FILES['file']['size']
//        : $_GET['flowIdentifier'],
//    'flowFilename' => isset($_FILES['file']) ? $_FILES['file']['name'] : $_GET['flowFilename'],
//    'flowRelativePath' => isset($_FILES['file']) ? $_FILES['file']['tmp_name'] : $_GET['flowRelativePath']
//]);











?>

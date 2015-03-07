<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/6/15
 * Time: 3:22 PM
 */

//$image = file_get_contents('images/default.png');
//
//echo $image;
function removehiddenfiles($Filenames_Arr){
  $filterednames = [];
    for($x=3;$x<count($Filenames_Arr);$x++){
        array_push($filterednames, $Filenames_Arr[$x]);
    }
    return $filterednames;
}


$dir    = 'images';
$rawfilesnames = scandir($dir);
$filenames = removehiddenfiles($rawfilesnames);
$filenames_objArr = [];
for($x=0;$x<count($filenames);$x++){
    $filenames_objArr[$x] = json_encode(["imagename"=>$filenames[$x]]);
}

echo "[" . implode(',',$filenames_objArr) . "]";
//                CTRL.answerimages = [
//            {imagename:'default.png'}
//
//            ];


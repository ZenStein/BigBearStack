<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/6/15
 * Time: 3:22 PM
 */
include $_SERVER['DOCUMENT_ROOT'] . '/BigBearStack/PHP_includes/functions.php';
//$image = file_get_contents('images/default.png');
//
//echo $image;
function removehiddenfiles($Filenames_Arr){
  $filterednames = [];
    if(count($Filenames_Arr) <= 2){
        return 'empty';
    }
    else {
        for ($x = 3; $x < count($Filenames_Arr); $x++) {
            array_push($filterednames, $Filenames_Arr[$x]);
        }
        return $filterednames;
    }
}

$qid = $_REQUEST['qid'];
$key = $_REQUEST['key'];
$dir    = 'images/answers/' . $qid . '/' . $key;
//$rawfilesnames = scandir($dir);
if(is_dir($dir)) {
    if ($rawfilesnames = scandir($dir)) {
        $filenames = removehiddenfiles($rawfilesnames);
        $filenames_objArr = [];
        if ($filenames != 'empty') {

            for ($x = 0; $x < count($filenames); $x++) {
                $filenames_objArr[$x] = json_encode(["image" => $filenames[$x],
                    "text" => "Description for " . $filenames[$x],
                    "qid" => $qid,
                    "key" => $key]);
            }
        } elseif ($filenames == 'empty') {
            echo 'FALSE'; exit;
          }
        echo "[" . implode(',', $filenames_objArr) . "]";
    }else{echo 'FALSE'; exit;}
}else{echo 'FALSE'; exit;}

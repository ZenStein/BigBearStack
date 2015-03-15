<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/14/15
 * Time: 5:06 PM
 */

$root = $_SERVER['DOCUMENT_ROOT'];
$qid = $_REQUEST['qid'];
$key = $_REQUEST['key'];

$qidimagedir = 'images/answers/' . $qid;// '/' . $key;
$imagedir = 'images/answers/' . $qid . '/' . $key;
if(!is_dir($qidimagedir)){
    if(mkdir($qidimagedir)){
       if(mkdir($imagedir)){
           echo 'success';
       }
    }
    else{ echo "couldn't make the directory ";}
}
else{echo 'img directory already exists'; }

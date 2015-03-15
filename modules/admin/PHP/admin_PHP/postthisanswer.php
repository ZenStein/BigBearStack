<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/11/15
 * Time: 9:11 PM
 */
include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
var_dump($_REQUEST);
$header = $_REQUEST['answerheader'];
$author = $_REQUEST['author'];
$bullets = $_REQUEST['bulletdata'];
$bullettype = $_REQUEST['bullettype'];
$images = $_REQUEST['images'];
$links = $_REQUEST['links'];
$qid = $_REQUEST['qid'];
$title = $_REQUEST['title'];
$key = $_REQUEST['key'];

//$imgfolderpath = $_SERVER['DOCUMENT_ROOT'] . "/images/answers/" . $_REQUEST['qid'];
//if(!mkdir($imgfolderpath)){echo "failed";}
//else{var_dump($_REQUEST); var_dump($_POST);}

$db = MySQLi_localhost_connect();

// "VALUES ('$qid','$title','$header',$bullets','$bullettype','$links','$author')"

$sql = "UPDATE `Cabins4LessFAQ`.`Master_Answers`
        SET `qid`='$qid', `title`='$title', `header`='$header',`images`='$images', `bullets`='$bullets', `bullettype`='$bullettype', `links`='$links', `author`='$author'
        WHERE `id` = '$key' ";

if($db->query($sql) === true){echo 'success';}
else{echo 'fail';}
<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/11/15
 * Time: 9:11 PM
 */
include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';

$header = $_REQUEST['answerheader'];
$author = $_REQUEST['author'];
$bullets = $_REQUEST['bulletdata'];
$bullettype = $_REQUEST['bullettype'];
$images = $_REQUEST['images'];
$links = $_REQUEST['links'];
$qid = $_REQUEST['qid'];
$title = $_REQUEST['title'];

$imgfolderpath = $_SERVER['DOCUMENT_ROOT'] . "/images/answers/" . $_REQUEST['qid'];
if(!mkdir($imgfolderpath)){echo "failed";}
else{var_dump($_REQUEST);}

$db = MySQLi_localhost_connect();

$sql = "INSERT INTO `Cabins4LessFAQ`.`Master_Answers`(`qid`, `title`, `header`, `images`, `bullets`, `bullettype`, `links`, `author`)
                    VALUES ('$qid','$title','$header','$images','$bullets','$bullettype','$links','$author') ";

if($db->query($sql) === true){echo 'success';}
else{echo 'fail';}
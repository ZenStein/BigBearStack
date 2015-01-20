<?php
include 'functions.php';

$rowid = "";
$questionid = generateUniqueId();
$category = findCategoryInQuestion($_REQUEST['question']);
$tags = $_REQUEST['tags'];
$author = $_REQUEST['author'];
$answerids= "";
$likes = "";
$views = "";
$question = $_REQUEST['question'];

$a =InsertNewQuestion($rowid, $questionid, $category, $tags, $author, $answerids, $likes, $views, $question);
$inserttags = InsertTagsINTOquestionTags($_REQUEST['tags'], $questionid);

if($a == 200){echo "success!!";}
else{echo "fail";}







 // $db = MySQLi_localhost_connect();
//  $query = "INSERT INTO `Cabins4LessFAQ`.`Master_Questions` 
//                      (`rowid`, `questionid`, `timestamp`, 
//                       `category`, `tags`, `author`, `answerids`, 
//                       `likes`, `views`, `question`) 
//                       VALUES ($rowid, '$questionid', $timestamp, '$category', 
//                              '$tags', '$author', '$answerids', 
//                              '$likes', '$views', '$question');";
//  if ($stmt = $db->prepare($query)) {
//    //$stmt->bind_param("iii", $rowid, $questionid, $timestamp, $category, $tags, $author, $answerids, $likes, $views, $question);
//    /* execute statement */
//    $stmt->execute();
//    if($stmt->affected_rows == 1){ $stmt->close(); return "200";}
//    else{return "error infunction InsertNewQuestion";}
//  }
//  else{return false;}

?>
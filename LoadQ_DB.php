<?php
  include 'functions.php';
  include 'classes.php';
  
    $MrCleaner = new InputsCleanse(
    array(
      "question"=>$_REQUEST['question'], 
      "tags"    =>$_REQUEST['tags'], 
      "author" =>$_REQUEST['author']
    ));
  $question = $_REQUEST['question'];
  $tags     = $_REQUEST['tags'];
  $keywords = $MrCleaner->getKeywordsAsString();
  $author   = $_REQUEST['author'];
  $a        = InsertNewQuestion($question, $tags, $keywords, $author);
  if($a == 200){
    echo "success!!";
  }
  else{
    echo "fail";
  }

//  echo "type is: " . gettype($_REQUEST['tags']) . " and contents are: " . check_input($_REQUEST['tags']) . "entities = &#33;";

?>
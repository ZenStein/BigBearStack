<?php
  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/classes.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
  
    $MrCleaner = new InputsCleanse(
    array(
      "author"=>$_REQUEST['author'], 
      "turntokeywords"    =>$_REQUEST['title'],
      "qid"=>$_REQUEST['qid']
    ));
  $author = $_REQUEST['author'];
  $title  = $_REQUEST['title'];
$answerheader  = $_REQUEST['answerheader'];
  $qid = $_REQUEST['qid'];
  $keywords = $MrCleaner->getKeywordsAsString();
  $a        = InsertNewAnswer($qid, $title,$answerheader, $author);
  if($a == 200){
    //echo "success Loading Answer!!";
    $somearr =     array(
                     "author"=>$_REQUEST['author'],
                     "turntokeywords"    =>$_REQUEST['title'],
                     "qid"=>$_REQUEST['qid']
                   );
    echo json_encode($somearr);
  }
  else{
    echo "ERROR: answer did not submit properly<br>" . $a;
  }

//  echo "type is: " . gettype($_REQUEST['tags']) . " and contents are: " . check_input($_REQUEST['tags']) . "entities = &#33;";

?>
<?php
  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/classes.php';
  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
  
  $Qstring  = $_REQUEST['querystring'];
  $loadString = new StringVersioner($Qstring);
  $keywordsArr = $loadString->getKeywordsArr();
  $keyWordCount = $loadString->CountKeywords();
  $insertString  = $loadString->getStringUPPER();
  $lastIteration = $keyWordCount - 1;
  $maxAllowedKeywords = 5;
  $dynamicSearchString = "";
  for($x=0;$x<$keyWordCount;$x++){
    if($x == $lastIteration || $x == $maxAllowedKeywords){
      $dynamicSearchString .= "`question` LIKE '%$keywordsArr[$x]%'";
      break;
    }
    else{
      $dynamicSearchString .= "`question` LIKE '%$keywordsArr[$x]%' AND ";
    }
  }
  $db  = MySQLi_localhost_connect();
  $query = "SELECT `qid`,`question`,`tags` FROM `Cabins4LessFAQ`.`Master_Questions` WHERE " . $dynamicSearchString;
  $row  = $db->query($query);
  $jsonArr = [];
  $i = 0;
  while($res = $row->fetch_array(MYSQLI_ASSOC)){
    $qid = $res['qid'];
    $q = $res['question'];
    $tag = explode(",",$res['tags']);
    $jsonArr[$i] = array("qid"=>$qid, "question"=>$q, "tags"=>$tag);  
    $i++;
  }
  
  echo json_encode($jsonArr);

?>
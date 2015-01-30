<?php

include 'functions.php';

$numIDs = assignProperID(generateUniqueId() - 1);

$db = MySQLi_localhost_connect();

$query = "SELECT `questionid`,`tags`,`author`,`question` 
          FROM `Cabins4LessFAQ`.`Master_Questions` 
          WHERE `questionid`>$numIDs LIMIT 10";

$result = $db->query($query);
$jsonArr = [];
$i = 0;
while($r = $result->fetch_array(MYSQLI_ASSOC))
{
  $questionid = $r['questionid'];
  //$tag = $r['tags'];
  $tag = explode(",",$r['tags']);
  $auth =$r['author'];
  $q = $r['question'];
  $jsonArr[$i] = array("qid"=>$questionid, "question"=>$q, "tags"=>$tag);  
  $i++;
}

echo json_encode($jsonArr);





//$MOCKquest1 = "WHERE CAN I FIND THE LAKE ";
//$MOCKquest2 = "what is the zip code ";
//$MOCKquest3 = "where is a good place to eat ";
//$auth = array("jim","mike","bob");
//for($x=0;$x<2000;$x+=3){
// $id1 = $x;   
// $id2 = $x+1; 
// $id3 = $x+2; 
// $jsonArr[$x] = array("qid"=>$id1, "author"=>$auth[0],"question"=>$MOCKquest1);   
// $jsonArr[$x+1] = array("qid"=>$id2, "author"=>$auth[1],"question"=>$MOCKquest2);   
// $jsonArr[$x+2] = array("qid"=>$id3, "author"=>$auth[2],"question"=>$MOCKquest3);   
//}
//echo json_encode($jsonArr);
?>
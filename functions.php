<?php

function MySQLi_localhost_connect()
{
  $host     = 'localhost';
  $username = 'root';
  $password = 'password';
  $database = 'Cabins4LessFAQ';
  
  $db = new MySQLi($host,$username,$password,$database);
  $error_message = $db->connect_error;
  if($error_message != NULL){die("did not connect to localhost");}
  return $db;   
}

function findCategoryInQuestion($string){return "who";}

function generateUniqueId(){
    
    $db = MySQLi_localhost_connect();
    $query = "SELECT rowid FROM Master_Questions";
    $countRows = $db->query($query);
    $numRows = $countRows->num_rows;
    $id = $numRows+1;
    //$query = "INSERT INTO `Cabins4LessFAQ`.`Master_Questions` (`rowid`) VALUES ('$id')";
    //$insertID = $db->prepare($query);
    //$insertID->execute();
    if($id >= 1){ return $id;}
    else{die("error generating an id in function  generateUniqueId() ");}
}
    //while($countRows->num_rows){echo "row";}
//$test = $_POST['param1'];
//foreach ($_POST as $key => $value) {
//    
//    echo $key . ' has the value of ' . $value;
//}
//echo $test;
//$test = json_decode($_SERVER['argv']);
//var_dump($_SERVER['argv']);
//$first = $_SERVER['argv'][0];
//$test =  json_decode($_SERVER["QUERY_STRING"]);

//var_dump($_SERVER["QUERY_STRING"]);
//echo "POST ===";
//var_dump($_POST);
//echo "get ===";
//var_dump($_GET);
//echo "request ===";
//var_dump($_REQUEST);
//echo "ENV ===";
//var_dump($_ENV);
//echo "SERVER ===";
//var_dump($_SERVER);



//var_dump($test);
//var_dump($test);
//die("THIS === " . $_SERVER["QUERY_STRING"]);
//$test = json_encode($_SERVER["QUERY_STRING"]);
//var_dump($test);
//var_dump($_POST);



function turnJSONobjIntoAssocArray($obj){
$assocArr = json_decode($obj, true);
$tagsAssoc = [];
foreach($assocArr as $key=> $value){
$tagsAssoc[$key] = $value;
}
return $tagsAssoc;
}

function InsertTagsINTOquestionTags($tagsObj, $questionID){
  $tags = turnJSONobjIntoAssocArray($tagsObj);
  /*we now need to INSERT uniqueid with all the tags INTO questionTags table*/
  return true; /*<<-- PLACEHOLDING*/
}

function InsertNewQuestion($rowid, $questionid, $category, $tags, $author, $answerids, $likes, $views, $question){
//var_dump($rowid); 
//var_dump($questionid);
//var_dump($timestamp);
//var_dump($category);
//var_dump($tags); 
//var_dump($author);
//var_dump($answerids);
//var_dump($likes);
//var_dump($views);
//var_dump($question);


  $db = MySQLi_localhost_connect();
  $query = "INSERT INTO `Cabins4LessFAQ`.`Master_Questions` 
                      (`rowid`, `questionid`, 
                       `category`, `tags`, `author`, `answerids`, 
                       `likes`, `views`, `question`) 
                       VALUES ('$rowid', '$questionid', '$category', 
                              '$tags', '$author', '$answerids', 
                              '$likes', '$views', '$question');";
  if ($stmt = $db->prepare($query)) {
    //$stmt->bind_param("iii", $rowid, $questionid, $timestamp, $category, $tags, $author, $answerids, $likes, $views, $question);
    /* execute statement */
    $stmt->execute();
    if($stmt->affected_rows == 1){ $stmt->close(); return "200";}
    else{return "error infunction InsertNewQuestion";}
  }
  else{return false;}
}

function assignProperID($num){
    if($num > 10){return $num-10;}
    else{return 0;}
}
?>
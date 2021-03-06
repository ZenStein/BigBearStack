<?php
  function MySQLi_localhost_connect()
  {
   /*Localhost*/
//    $host     = 'localhost';
//    $username = 'root';
//    $password = 'password';
//    $database = 'Cabins4LessFAQ';
   /*Godaddy*/
//   $host     = 'localhost';
//   $username = 'tymetakrDB';
//   $password = 'Aquem1n1';
//   $database = 'Cabins4LessFAQ';
   /*Remote to GoDaddy*/
     $host     = '192.186.233.5'; // remote IP
     $username = 'tymetakrDB';
     $password = 'Aquemini213';
     $database = 'Cabins4LessFAQ';

     $db = new MySQLi($host,$username,$password,$database);
     $error_message = $db->connect_error;
     if($error_message != NULL){
      die("did not connect to localhost");
     }
     return $db;
  }
  
  function turnJSONobjIntoAssocArray($obj){
    $assocArr = json_decode($obj, true);
    $tagsAssoc = [];
    foreach($assocArr as $key=> $value){
      $tagsAssoc[$key] = $value;
    }
    return $tagsAssoc;
  }
  
  function InsertNewQuestion($question_1, $tags_1, $keywords_1, $author_1){
    $db = MySQLi_localhost_connect();
    $numargs = func_num_args();
    if($numargs != 4){
      return "Error! argument mismatch in \'InsertNewQuestion\'. $numargs arguments passed, supposed to be 7";
    }
    $argsArr = func_get_args();
    for ($i = 0; $i < $numargs; $i++) {
      $inputsArr[$i] = $db->real_escape_string($argsArr[$i]);
    }
    $query = "INSERT INTO `Cabins4LessFAQ`.`Master_Questions` (`question`, `tags`, `keywords`, `author`) VALUES (?,?,?,?)";
    $stmt  = $db->prepare($query);
    $stmt->bind_param("ssss", $inputsArr[0], $inputsArr[1], $inputsArr[2], $inputsArr[3]);
    $stmt->execute();
    if($stmt->affected_rows == 1){ 
      $stmt->close(); 
      return "200";
    }
    else{
      return "error in function InsertNewQuestion";
    }
  }

  function InsertNewAnswer($questionid, $title, $answerheader, $author){
    $db = MySQLi_localhost_connect();
    $numargs = func_num_args();
    if($numargs != 4){
      return "Error! argument mismatch in \'InsertNewAnswer\'. $numargs arguments passed, supposed to be 4";
    }
    $argsArr = func_get_args();
    for ($i = 0; $i < $numargs; $i++) {
      $inputsArr[$i] = $db->real_escape_string($argsArr[$i]);
    }
    $query = "INSERT INTO `Cabins4LessFAQ`.`Master_Answers` (`qid`,`title`, `header`,`author`) VALUES (?,?,?,?)";
    $stmt  = $db->prepare($query);
    $stmt->bind_param("isss", $inputsArr[0], $inputsArr[1], $inputsArr[2], $inputsArr[3]);
    $stmt->execute();
    if($stmt->affected_rows == 1){ 
      $stmt->close(); 
      return "200";
    }
    else{
      return "ERROR: Answer was not submitted";
    }
  }  
  
  function makeCleanString($subject){
    $filter1 = preg_replace("/[\"\[\]]{1}/","",$subject);
    $filter2 = check_input($filter1);
    return $filter2;
  }
  function check_input($data) {
    $checkedData = trim($data);
    $checkedData = stripslashes($data);
    $checkedData = htmlspecialchars($data);
    return $checkedData;
  }
?>
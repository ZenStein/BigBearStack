<?php
  function MySQLi_localhost_connect()
  {
    $host     = 'localhost';
  $username = 'tymetakrDB';
  $password = 'Aquem1n1';
    $database = 'Cabins4LessFAQ';
    $db = new MySQLi($host,$username,$password,$database);
    $error_message = $db->connect_error;
    if($error_message != NULL){
      die("did not connect to localhost");
    }
      return $db;
  }

$db = MySQLi_localhost_connect();
$query = "SELECT * FROM `Cabins4LessFAQ`.`Master_Answers` WHERE `qid` = 33";
$stmt = $db->query($query);              
while ($row = $stmt->fetch_assoc()){
 $objArr[$x] = $row;

$x++;
}
$stmt->close();
$db->close();

print_r(json_encode($objArr));

  ?>



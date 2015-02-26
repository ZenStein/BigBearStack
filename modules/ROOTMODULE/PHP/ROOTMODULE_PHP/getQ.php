<?php

include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
$qid = check_input($_REQUEST['qid']);
settype($qid, "integer"); 
$db = MySQLi_localhost_connect();
$query = "SELECT * FROM `Cabins4LessFAQ`.`Master_Questions` WHERE `qid` = $qid";
$stmt = $db->query($query);              
while ($row = $stmt->fetch_assoc()){
  echo json_encode($row);
}
$stmt->close();
$db->close();

?>
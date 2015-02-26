<?php

  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';


$qid = check_input($_REQUEST['qid']);
settype($qid, "integer");
$objArr = [];
$x = 0;

$db = MySQLi_localhost_connect();
$query = "SELECT * FROM `Cabins4LessFAQ`.`Master_Answers` WHERE `qid` = $qid";
$stmt = $db->query($query);              
while ($row = $stmt->fetch_assoc()){
 $objArr[$x] = $row;

$x++;
}
$stmt->close();
$db->close();

print_r(json_encode($objArr));
?>
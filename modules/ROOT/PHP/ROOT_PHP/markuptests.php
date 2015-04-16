<?php


  include $_SERVER['DOCUMENT_ROOT'] . '/BigBearStack/PHP_includes/functions.php';


echo 'hey';


$db = MySQLi_localhost_connect();
$query = "SELECT * FROM `Cabins4LessFAQ`.`Master_Answers` WHERE `id` = 18";
$stmt = $db->query($query);              
while ($row = $stmt->fetch_assoc()){
print_r($row);
}
$stmt->close();
$db->close();

?>
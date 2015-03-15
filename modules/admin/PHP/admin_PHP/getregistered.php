<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/13/15
 * Time: 1:48 PM
 */

 include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
$qid = $_REQUEST['qid'];
$db = MySQLi_localhost_connect();
$registrationkey= '';
$sql = "INSERT INTO `Cabins4LessFAQ`.`Master_Answers` (`qid` ,`status`) VALUES ('$qid', 'default')";
if ($db->query($sql) === TRUE) {
    $registrationkey = $db->insert_id;
}

echo $registrationkey;


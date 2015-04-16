<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/12/15
 * Time: 10:23 AM
 */
include $_SERVER['DOCUMENT_ROOT'] . '/BigBearStack/PHP_includes/functions.php';

$db = MySQLi_localhost_connect();


$sql = "SELECT `qid` FROM `Cabins4LessFAQ`.`Master_Questions`";
$each = $db->query($sql);
$Q_qid = [];
while($res = $each->fetch_assoc()){
    array_push($Q_qid, $res['qid']);
}
$allquestions = array_unique($Q_qid);
//print_r($allquestions);

//echo "<br>";


$sql = "SELECT `qid` FROM `Cabins4LessFAQ`.`Master_Answers`";
$each = $db->query($sql);
$Arr_qid = [];
while($res = $each->fetch_assoc()){
    array_push($Arr_qid, $res['qid']);
}
$questionsthatareanswered = array_unique($Arr_qid);
//print_r($questionsthatareanswered);



$unanswered = array_diff($allquestions, $questionsthatareanswered);
//print_r($unanswered);

$Arr_objs_return = [];
foreach($unanswered as $id) {
    $sql = "SELECT `qid`, `question` FROM `Cabins4LessFAQ`.`Master_Questions` WHERE `qid`= '$id' ";
    $row = $db->query($sql);
    while ($res = $row->fetch_assoc()) {

    $qid =$res['qid'];
    $question = $res['question'];
    $obj = array("qid"=>$qid,"question"=>$question);
    $temp = json_encode($obj, JSON_FORCE_OBJECT);
    array_push($Arr_objs_return, $temp);
    }
}

echo "[" . implode(",",$Arr_objs_return) . "]";
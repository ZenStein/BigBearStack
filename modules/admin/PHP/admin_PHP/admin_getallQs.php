<?php

include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';


$db = MySQLi_localhost_connect();
$sql = "SELECT `question`, `qid` FROM `Cabins4LessFAQ`.`Master_Questions`";


//$sql = "SELECT  firstname, lastname FROM MyGuests";
$result = $db->query($sql);
$objArr = [];
if ($result->num_rows > 0) {
while ($row = $result->fetch_assoc()){

    $qid = $row['qid'];
    $title = $row['question'];

    $temp = array(
          "qid"=>$qid,
        "question"=>$title
    );

    array_push($objArr, json_encode($temp));
}

$db->close();
echo "[" . implode(",",$objArr) . "]";
}
else {
  echo "0 results";
}

?>

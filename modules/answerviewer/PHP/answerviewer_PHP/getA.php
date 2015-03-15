<?php

  include $_SERVER['DOCUMENT_ROOT'] . '/PHP_includes/functions.php';
function stringto_objArr($string){
    $temp = substr($string, 0, -1);
    $temp2 = substr($temp,1);
    $temp3 = str_replace("},{","}::?::{",$temp2);
    $temp4 = explode("::?::",$temp3);
        $tempArr = array();
    foreach($temp4 as $val){
        array_push($tempArr, json_decode($val));
    }
    //var_dump($tempArr);
    return $tempArr;
}

$qid = check_input($_REQUEST['qid']);
settype($qid, "integer");
$objArr = [];
$x = 0;

$db = MySQLi_localhost_connect();
$query = "SELECT * FROM `Cabins4LessFAQ`.`Master_Answers` WHERE `qid` = $qid";
$stmt = $db->query($query);              
while ($row = $stmt->fetch_array(MYSQLI_ASSOC)){

    $qid = $row['qid'];
    $key = $row['id'];
    $timestamp = $row['timestamp'];
    $title = $row['title'];
    $header = $row['header'];
    $author = $row['author'];
    $bullettype = $row['bullettype'];
    //$bullets = stringto_objArr($row['bullets']);
    $bullets = json_decode($row['bullets']);
    $links = json_decode($row['links']);
    $images = json_decode($row['images']);

    $temp = array(
          "qid"=>$qid,
          "key"=>$key,
    "timestamp"=>$timestamp,
        "title"=>$title,
       "header"=>$header,
       "author"=>$author,
   "bullettype"=>$bullettype,
      "bullets"=>$bullets,
        "links"=>$links,
       "images"=>$images
    );

    array_push($objArr, json_encode($temp));


$x++;
}
$stmt->close();
$db->close();
echo "[" . implode(",",$objArr) . "]";

?>


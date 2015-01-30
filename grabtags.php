<?php

  include 'functions.php';
  $db = MySQLi_localhost_connect();
  $query = "SELECT `class`,`html`,`glyph` FROM `Cabins4LessFAQ`.`Tags` WHERE `tagID` > 0";
  $result = $db->query($query);
  $jsonArr = [];
  $i = 0;
  while($r = $result->fetch_array(MYSQLI_ASSOC)){
    $class = $r['class'];
    $html  = $r['html'];
    $glyph =$r['glyph'];
    $jsonArr[$i] = array("class"=>$class, "html"=>$html, "glyph"=>$glyph);  
    $i++;
  }
  
  echo json_encode($jsonArr);

?>
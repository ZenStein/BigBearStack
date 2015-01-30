<?php

  class StringVersioner{
  /*properties*/
    private $Querystring;
    private $toRemove;	
    private $keywords;
    
  /*private methods*/
    private function CleanseString($string){
      $cleaningString = trim($string);
      $cleaningString = stripslashes($string);
      $cleaningString = htmlspecialchars($string); 
      return $cleaningString;   
    }
  /*public methods*/  
    public function __construct($string){
      $cleanString = $this->CleanseString($string);
      $this->Querystring = $cleanString;
      $this->toRemove = include 'WordsToRemove.php';
      $versionRemovedWords = str_ireplace($this->toRemove, " ", $this->Querystring); 
      $this->keywords = explode(" ",$versionRemovedWords);                            
    }
    public function MakeRemoveWordsSample($sampleString){
      $versionRemovedWords = str_ireplace($this->toRemove, " ", $sampleString); 
      return explode(" ",$versionRemovedWords);
    }  
    public function getQString(){
      return $this->Querystring;  
    }
    public function getStringUPPER(){
      $UPPERcaseVersion = $this->Querystring;
      return strtoupper($UPPERcaseVersion);
    }    
    public function getKeywordsArr(){
      return $this->keywords;
    }
    public function getKeywordsAsString(){
      $KeyWordsAsString = "";
      $KeywordsArr = $this->getKeywordsArr();
      $numKeys = $this->CountKeywords();
      for($x=0;$x<$numKeys;$x++){
        $KeyWordsAsString .= $KeywordsArr[$x] . ",";     
      }
      return substr($KeyWordsAsString, 0, -1);
    }  
    public function CountKeywords(){
     $theArr = $this->getKeywordsArr();
     return count($theArr); 
    }
  }
  
  class InputsCleanse extends StringVersioner{
  /*properties*/
    private $ArrOfInputs;  
  /*methods*/ 
    public function __construct($Arr){
      call_user_func('parent::__construct', $Arr['question']);
      $paramType = gettype($Arr);
      if($paramType == "array"){
        $CleansedArr = [];
        foreach ($Arr as $key => $value) {
          $CleansedArr[$key] = trim($value);
          $CleansedArr[$key] = stripslashes($value);
          $CleansedArr[$key] = htmlspecialchars($value);
        }
        $this->ArrOfInputs = $CleansedArr;
      }
      else{
        die('param for InputArrCleanse needs to be an array!');
      }
    }
    public function PrintArrOfInputs(){
      return print_r($this->ArrOfInputs);   
    }
  }

?>
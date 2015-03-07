<?php
/**
 * Created by PhpStorm.
 * User: C-Styles
 * Date: 3/5/15
 * Time: 9:45 AM
 */
require_once( 'vendor/autoload.php');

$config = new Config(array(
   'tempDir' => './chunks_temp_folder'
));
$request = new Request();
if (\Flow\Basic::save(__DIR__ . '/' . $request->getFileName(), $config, $request)) {
  echo "Hurray, file was saved in " . __DIR__ . '/' . $request->getFileName();
}
// In most cases, do nothing, \Flow\Basic handles all errors
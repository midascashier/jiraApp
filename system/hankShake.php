<?php
$filename = 'hankShake.json';
$content = file_get_contents($filename);

$headers = [];
foreach($_SERVER as $name => $value){
  if(substr($name, 0, 5) == 'HTTP_'){
    $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
  }
}

if(count($_REQUEST)){
  $handle = fopen($filename, 'r+');
  $contentCurrent = array_merge($_REQUEST, $headers);

  $content = array_merge(json_decode($content, true), $contentCurrent);
  fwrite($handle, json_encode($content));
  fclose($handle);
}

echo file_get_contents($filename);
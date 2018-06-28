<?php
require './Cache.class.php';
require './CoreConfig.class.php';

class ServiceData
{
  private $data;
  private $document;

  function __construct()
  {
    $this->data = $_REQUEST['data'];
    $this->document = $_REQUEST['document'];

    $method = strtolower($_SERVER['REQUEST_METHOD']);
    $action = $method . 'Document';

    $responseObj = json_encode($this->$action());
    echo $_GET['callback'] . "({$responseObj});";
  }

  private function getDocument(){
    return Cache::getDocument($this->document);
  }

  private function putDocument(){
    $data = file_get_contents('php://input');

    $currentDocument = Cache::getDocument($this->document);
    return Cache::loadDocument($this->document, array_merge($currentDocument, $data), false);
  }

  private function postDocument(){
    $data = file_get_contents('php://input');

    $currentDocument = Cache::getDocument($this->document);
    $document = ($currentDocument) ? array_merge($currentDocument, $data) : $data;
    return Cache::loadDocument($this->document, $document, false);
  }

  private function deleteDocument(){
    return Cache::clearCache($this->document);
  }
}

new ServiceData();
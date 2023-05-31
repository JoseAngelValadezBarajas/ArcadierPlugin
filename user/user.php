<?php
    $contentBodyJson = file_get_contents('php://input');
    $jsonContent_I = json_decode($contentBodyJson, true);
    $apiUsername = $jsonContent_I['user'];
    $apiPassword = $jsonContent_I['pass'];
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool(); 
    $userList = $sdk->getCustomTablePostManVer("users");
    $jsonUserList = json_decode($userList);
    $jsonRecords= $jsonUserList->Records;
    foreach($jsonRecords as $Record){
        if ($Record ->userId == $apiUsername){
            if ($Record ->pass == $apiPassword){
                $id=$Record ->Id;
                $userInfo = array("access"=>"True", "Id"=>$id);
                echo json_encode($userInfo);
            }
        }
    }
?>



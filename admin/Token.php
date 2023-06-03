<?php
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool();
    try{
        [$adminToken,$userID] = $sdk->obtainAdmintoken();
        $userInfo = array("Token"=>$adminToken, "Id"=>$userID);
        echo json_encode($userInfo);
    }catch(Exception $e){
        return $e->getMessage();
    }
?>
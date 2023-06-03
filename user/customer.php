<?php
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool();
    try{
        $info = $sdk->getCustomTablePostManVer("info");
        echo json_encode($info);
    }catch(Exception $e){
        return $e->getMessage();
    }
?>

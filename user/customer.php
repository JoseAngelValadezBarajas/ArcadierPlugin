<?php
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool(); 
    $info = $sdk->getCustomTablePostManVer("info");
    echo json_encode($info);
?>

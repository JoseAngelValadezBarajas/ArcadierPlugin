<?php
    $username = $_POST['user'];
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool(); 
    $userList = $sdk->getCustomTablePostManVer("users");
    echo $userList;
    return $userList;
?>



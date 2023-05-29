<?php
    $username = $_POST['user'];
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool(); 
    //list ($user,$id) = $sdk->subGetAdminToken();
    $userList = $sdk->getCustomTablePostManVer("users");
    echo $userList;
    return $userList;
?>



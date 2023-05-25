<?php
    echo "Hola!";
    //$username = $_REQUEST["inputUser"];
    //$password = $_REQUEST["inputUser"];
    $username = "angel.valadez@towasoftware.com";
    $password = "SkullerA.117";
    include 'AtArcadierTool_class.php';
    $sdk = new AtArcadierTool(); 
    list ($user,$id) = $sdk->subGetAdminToken(); 
    echo $user;
    echo $id;
    //header("Location: https://towaretail.sandbox.arcadier.io/user/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/user.html", TRUE, 301);
    //exit();
?>
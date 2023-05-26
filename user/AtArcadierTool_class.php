<?php
//                                                          //AUTHOR: Towa (MAC-Manuel Acosta)
//                                                          //CO-AUTHOR: 
//                                                          //DATE: December 23, 2020

//======================================================================================================================
class AtArcadierTool
{
    //-------------------------------------------------------------------------------------------------------------------
    //														//This PHP class is used to provide resources and methods to
    //                                                      //      communicate to the Arcadier API.


    //-------------------------------------------------------------------------------------------------------------------
    function subGetAdminToken() 
    {
        $marketplace = $_COOKIE["marketplace"];
        $protocol = $_COOKIE["protocol"];

        $baseUrl = $protocol . '://' . $marketplace;

        $client_id = 'X2BRHz9VGnJqwnc9IIdkadvReJQOvgHBoM0Z9p3M';
        $client_secret = 'Tn4oefIwZZ_YZivuWSEwV0wusu2A1BlrZSPE5oIVADNNkxT14Bb';

        $url = $baseUrl . '/token';
        $body = 'grant_type=client_credentials&client_id='.$client_id.'&client_secret='.$client_secret.'&scope=admin';

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        $obj = json_decode($result);
        $adminToken = $obj->access_token;
        $userID = $obj->UserId;
        curl_close($curl);

        return array ($adminToken,$userID);
    }

    //-------------------------------------------------------------------------------------------------------------------
    function strAdminId(
        $strAdminToken_I
        )
    {
        $strUserAdminUrl = $this->strGetMarketplaceBaseUrl() . '/api/v2/users/';
        $result = $this->subCallAPI("GET", $strAdminToken_I, $strUserAdminUrl, false);

        return $result['ID'];
    }

    //-------------------------------------------------------------------------------------------------------------------
    function subCallAPI(
        //                                                      //Method to perform requests to the API, it allow GET, POST,
        //                                                      //      PUT and DELETE HTTP methods.
    
        //                                                      //Var which hold the Method request, string.
        $strMethod_I, 
    
        //                                                      //Var which hold the access_token, string.
        $arrchAccess_token_I,
    
        //                                                      //Var which hold the url where it will be performed the 
        //                                                      //      request, string.
        $strUrl_I, 
    
        //                                                      //Var which hold the data to send with some of the requests.
        $objData_I = false
        ) 
    {
        $curl = curl_init();
        switch ($strMethod_I) {
            case "POST":
                curl_setopt($curl, CURLOPT_POST, 1);
    
                if ($objData_I) {
                    $jsonDataEncoded = json_encode($objData_I);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
                }
    
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
    
                if ($objData_I) {
                    $jsonDataEncoded = json_encode($objData_I);
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
                }
    
                break;
            case "DELETE":
    
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
                // if ($objData_I) {
                //     $jsonDataEncoded = json_encode($objData_I);
                //     curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonDataEncoded);
                // }
    
                break;   
            default:
                //                                              //GET method.
                if ($objData_I) {
                    $strUrl_I = sprintf("%s?%s", $strUrl_I, http_build_query($objData_I));
                }
        }
    
        //                                                      //Preparing headers to being send.
        $headers = ['Content-Type: application/json'];
        if ($arrchAccess_token_I != null && $arrchAccess_token_I != '') {
            array_push($headers, sprintf('Authorization: Bearer %s', $arrchAccess_token_I));
        }
    
        //                                                      //Preparing the request.
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_URL, $strUrl_I);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    
        //                                                      //Performing the request.
        $arrResult = curl_exec($curl);
        curl_close($curl);
    
        //                                                      //From the JSON string response it returns an 
        //                                                      //      associative array which holds all
        //                                                      //      the data from response.
        return json_decode($arrResult, true); 
    }
    
    //------------------------------------------------------------------------------------------------------------------
    function strGetMarketplaceBaseUrl()
    {
        $marketplace = $_COOKIE["marketplace"];
        $protocol = $_COOKIE["protocol"];
    
        $baseUrl = $protocol . '://' . $marketplace;
        return $baseUrl;
    }
    
    //------------------------------------------------------------------------------------------------------------------
    function strPackageID() 
    {
        $requestUri = "$_SERVER[REQUEST_URI]";
        preg_match('/([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/', $requestUri, $matches, 0);
        return $matches[0];
    }
    
    //------------------------------------------------------------------------------------------------------------------
    function strCustomFieldPrefix() 
    {
        $requestUri = "$_SERVER[REQUEST_URI]";
        preg_match('/([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/', $requestUri, $matches, 0);
        $customFieldPrefix = str_replace('-', '', $matches[0]);
        return $customFieldPrefix;
    }

    function getCustomTable($table)
    {
        $marketplace = $_COOKIE["marketplace"];
        $protocol = $_COOKIE["protocol"];
        $baseUrl = $protocol . '://' . $marketplace;
        $url = $baseUrl . '/api/v2/plugins/0db2bace-59df-4070-ad98-d0e2821b8851/custom-tables/';
        $urlTabl = $url .  $table . '/';
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, $urlTabl);
        curl_setopt($curl, CURLOPT_HEADER, 0); 
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);


        $response = curl_exec($curl);
        //$convertedText = str_replace(array("\r\n", "\r", "\n"), '<br />', $response);
        $manage = json_decode($response, true);
        echo "<br>";
        echo "<br>";
        echo "<br>";
        $records= $manage['Records'];
        //var_dump(count($records));
        //print_r ($manage['Records'][0]["userId"]);
        $data = $manage['Records'][0]["userId"];

        $output = preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/', function ($match) {
            return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
        }, $data);
        echo "Test";
        echo $output;
        curl_close($curl);
        return $response ;
    }
    
    //------------------------------------------------------------------------------------------------------------------    

}

//======================================================================================================================
?>
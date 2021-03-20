<?php
//login script
    require 'connect.php';
    require 'global.php';
    $postdata= file_get_contents('php://input');
    // array variable to hold the process result
    $processResult = array();
    if(isset($postdata) && !empty($postdata)){
         //decoding json body
         $data = json_decode($postdata);
         if(isset($data->pass)){
            $sentpass=$data->pass;
            if($sentpass == $pass){
                array_push($processResult, array(
                "result" => "success"
            ));}
            else {
                array_push($processResult, array(
                    "result" => "Invalid password",
                ));
            }
    }
    }else {

            // pushing insufficient information error into result array
            array_push($processResult, array(
                "result" => "noJSONerror",
            ));
        
        }
    // setting header for returning JSON response
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    header('Content-type: application/json');
    // Returning the JSON array
    echo json_encode($processResult);
?>

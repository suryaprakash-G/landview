<?php
//login script
    require '../config/connect.php';
    require 'global.php';
    // username and password
    $usr = $_POST['usr'];
    $pass = $_POST['pass']; 
    // array variable to hold the process result
    $processResult = array();
    if(isset($usr) && !empty($usr) && isset($pass) && !empty($pass)){
         auth($usr,$pass,$processResult);
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

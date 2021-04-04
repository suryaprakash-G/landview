<?php
$processResult = array();
$sql="none";
require 'connect.php';
$postdata= file_get_contents('php://input');
// array variable to hold the process result
$processResult = array();
if(isset($postdata) && !empty($postdata)){
    //decoding json body
    $data = json_decode($postdata);
    if(isset($data->ind)){
        $ind=$data->ind;
        $sql = "SELECT * FROM `lands` WHERE `id` like '$ind'";
    }else if(isset($data->name)){
        $name=$data->name;
        $sql = "SELECT * FROM `lands` WHERE `name` like '$name'";
    }

    if($sql!="none"){
        $result = $conn->query($sql) or die('fail');
        if($result){
            if ($result->num_rows > 0){
                $row = $result->fetch_assoc();
                    array_push($processResult, array(
                        "result" => "success",
                        "lnd" =>
                        array(array(
                            "n" => $row["name"],
                            "i" => $row["images"],
                            "l" => $row["location"],
                            "ad" => $row["address"],
                            "p" => $row["price"],
                            "ar" => $row["area"],
                            "c" => $row["city"],
                            "t" => $row["type"],
                            "a" => $row["about"])
                        ),
                    ));
            }
            else{ array_push($processResult, array("result" => "failprd"));}
        }
    }

    else{ array_push($processResult, array("result" => "fail"));}
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
    echo json_encode($processResult);
?>
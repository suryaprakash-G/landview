<?php
    require 'connect.php';
    require 'global.php';
    $postdata= file_get_contents('php://input');
    // array variable to hold the process result
    $processResult = array();
    if(isset($postdata) && !empty($postdata)){
         //decoding json body
         $data = json_decode($postdata);
         if(isset($data->name)&& isset($data->location)&& isset($data->address)&& isset($data->price)
            && isset($data->area)&& isset($data->about)&& isset($data->city)&& isset($data->type)){
                $name=$data->name;
                $locaction=$data->location;
                $address=$data->address;
                $price=$data->price;
                $area=$data->area;
                $about=$data->about;
                $city=$data->city;
                $type=$data->type;
                $sql = "SELECT * FROM `lands` WHERE `name` like '$name'";
                // executing sql query and returning error if the query failed
                $result = $conn->query($sql) or die(' signup.php [ErrorSQL: ' . $sql . ' ]');
                $row = $result->fetch_assoc();
                // check if user already exists in verified database
                if ($result->num_rows > 0) {
                    // pushing user userAlreadyExistsAndVerified error into result array
                    array_push($processResult, array(
                        "result" => "land name exists try new name",
                    ));
                }
                // if user does not exist in Verified database
                else {
                    $sql = "INSERT INTO `lands` (`name`, `location`, `address`, `price`, `area`, `about`,`city`,`type`)
                    VALUES ('$name','$location','$address','$price','$area','$about','$city','$type')";
                    // executing sql query and returning error if the query failed
                    $result = $conn->query($sql) or die('[ErrorSQL]');
                    // pushing process success into array
                    array_push($processResult, array(
                        "result" => "success",
                    ));
            
                }
         }
    }else {
        // pushing insufficient information error into result array
        array_push($processResult, array(
            "result" => "noJSONerror",
        ));
    
    }
?>
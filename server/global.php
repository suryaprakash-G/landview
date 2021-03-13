<?php
$server='127.0.0.1/landview';
function auth($User_Name,$Password,&$processResult){
    require '../config/connect.php';
    // constructing sql query to query database with recieved user details
    $sql = "SELECT * FROM `Admin_login` WHERE `User_Name` like '$User_Name'";

    // executing sql query and returning error if the query failed
    $result = $conn->query($sql) or die('[ErrorSQL]');

    // check if user exists in database
    if ($result->num_rows > 0){

        // fetching tuple of user and store in 'row' variable
        $row = $result->fetch_assoc();
        // verifying validity of passwords by comparing hashes
        if($row['Password'] == $Password){     
            // pushing user details into result array to be sent back to app
            array_push($processResult, array(
                "result" => "success"
                "lvl" => $row["level"],
            ));
        }
        // if user password is wrong
        else {
            // pushing password error into result array
            array_push($processResult, array(
                "result" => "Invalid password",
            ));
        }
    } 
    // if user does not exist in database
    else {
        // pushing user unknown error into result array
        array_push($processResult, array(
            "result" => "Invalid Username",
        ));
    }
}
?>

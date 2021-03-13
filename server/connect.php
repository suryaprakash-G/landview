<?php
        //script to connect to the database
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "landview";
    
        // connecting to database
    $conn = new mysqli($servername, $username, $password, $dbname);
        // check connection and quit if connecting failed showing error message
    if ($conn->connect_error) die("Connection failed: " . $conn->connect_error); 
    mysqli_set_charset($conn,"utf8");
?>

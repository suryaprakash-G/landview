<?php
    $land = $_REQUEST['land']; 
    $pic = $_REQUEST['pic'];
    if(!is_dir("images/".$land)) {
        mkdir("images/".$land);}
    $image_base64 =  file_get_contents("php://input");
    $myfile = fopen("images/".$land."/".$pic.".png", "w") or die("Unable to open file!");
    fwrite($myfile,$image_base64);
    fclose($myfile);
?>

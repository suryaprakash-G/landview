<?php
    $image_base64 =  file_get_contents("php://input");
    // path to admin/
$this_dir = dirname(__FILE__);

// admin's parent dir path can be represented by admin/..
$parent_dir = realpath($this_dir . '/..');

// concatenate the target path from the parent dir path
$target_path = $parent_dir . '/landview/images/' . "new" . '.png';
echo $target_path;
    $myfile = fopen($target_path, "w") or die("Unable to open file!");
    fwrite($myfile,$image_base64);
    fclose($myfile);
?>

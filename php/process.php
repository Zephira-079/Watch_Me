<?php

date_default_timezone_set('Asia/Manila');
echo date('Y-m-d H:i:s');

if (isset($_POST)) {
    $imageData = $_POST['imageData'];
    $imageDataDecoded = base64_decode($imageData);

    $collection_name = "collection";

    if (!file_exists("../".$collection_name)) mkdir("../".$collection_name);
    $filename = "../$collection_name/capture_image-"."date_".date('Y-m-d')."_time_".date('H-i-s').".png";
    file_put_contents($filename, $imageDataDecoded);

}

echo 'Image saved successfully: ' . $filename;

?>
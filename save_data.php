<?php

$file = "mapping_data/mapping_data.csv";
$data = clean($_POST['mapping_data']);
$imageId = '7';
$matches = null;

if (!find_text($file, $imageId)){
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
}
else{
    echo "Data already exist".$matches;
}

function find_text($file, $imageId){
    global $matches;
    $handle = fopen($file, "r");
    if ($handle)
    {
        while (!feof($handle))
        {
            $content = fgets($handle);
            //if(strpos($content, $imageId) !== FALSE) {
            if(preg_match($imageId, $content)) {
                $matches = $content;
                echo "IF Data already exist".$matches;
                break;
            }
            else{
                echo "ELSE Data not already exist".$matches;
            }
        }
        fclose($handle);
    }
}

function clean($str1) {
    $str1 = str_replace(' ', '', $str1);
    $str1 = preg_replace('/[^A-Za-z0-9\,]/', '', $str1);
    $str1 = rtrim($str1,',');
    return "\r\n".$str1;
}

?>
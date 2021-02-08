<?php

$file = "mapping_data/mapping_data.csv";
$data = clean($_POST['mapping_data']);
$objId = '7';
file_put_contents($file, $data, FILE_APPEND | LOCK_EX);

// if (!find_text($file, $objId)){
//     file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
// }
// else{
//     echo "Data already exist".$matches;
// }

function find_text($file, $objId, $data)
{   
    $flag = False;
    $handle = fopen($file, "r");
    if ($handle)
    {
        while (!feof($handle))
        {
            $content = fgetcsv($handle, 1024, ",");
            if(strcmp($objId, $content[0]) == 0){
                $content = $data;
                file_put_contents($file, $content, FILE_APPEND | LOCK_EX);
                $flag = True;
            }
        }
        fclose($handle);
    }
    return $flag;
}

function clean($str1) {
    $str1 = str_replace(' ', '', $str1);
    $str1 = preg_replace('/[^A-Za-z0-9\,\_]/', '', $str1);
    $str1 = rtrim($str1,',');
    return "\r\n".$str1;
}

?>
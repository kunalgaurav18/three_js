<?php

$objId =  $_POST['objId'];

$file = "mapping_data/mapping_data.csv";

$object_info = find_text($file, $objId);

if ($object_info)
    echo implode(", ",$object_info);


function find_text($file, $objId)
{
    $handle = fopen($file, "r");
    if ($handle)
    {
        while (!feof($handle))
        {
            $content = fgetcsv($handle, 1024, ",");
            if(strcmp($objId, $content[0]) == 0)
                return $content;
        }
        fclose($handle);
    }
}

?>

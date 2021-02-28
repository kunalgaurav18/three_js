<?php
$configs = include('config.php');

$folder_structure = ReadFolderDirectory($configs->data_dir);
echo json_encode($folder_structure);

function ReadFolderDirectory($dir)
{
    $listDir = array();
    if($handler = opendir($dir))
    {
        while (($sub = readdir($handler)) !== FALSE)
        {
            if ($sub != "." && $sub != ".." && $sub != "Thumb.db")
            {
                if(is_file($dir."/".$sub))
                {
                    $listDir[] = $sub;
                }elseif(is_dir($dir."/".$sub))
                {
                    $listDir[$sub] = ReadFolderDirectory($dir."/".$sub); 
                } 
            } 
        }    
        closedir($handler); 
    } 
    return $listDir;    
}

?>





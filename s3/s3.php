<?php

require '/apps/php-dynamodb/vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\S3\Exception\S3Exception;

$bucket = 'toriml.datasets';
$keyname = '*** Your Object Key ***';

$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'us-east-1'
]);

try {
/*
	$result = $s3->ListObjects(['Bucket' => $bucket, 'MaxKeys' => 1000, 'Delimiter'=>'/' , 'Prefix' => 'shapenet/ShapeNetCore.v2/']);
	foreach ($result['CommonPrefixes'] as $item) {
		echo $item['Prefix']."\n";
	}
*/
$objects = $s3->getIterator('ListObjects', array(
    'Bucket' => $bucket,
    'Prefix' => 'shapenet/ShapeNetCore.v2/'
));
foreach ($objects as $object) {
    echo $object['Key'] . "\n";
}

    } catch (S3Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}

?>

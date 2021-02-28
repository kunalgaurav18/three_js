<?php
    require '/apps/php-dynamodb/vendor/autoload.php';
	
	date_default_timezone_set('UTC');
    
	use Aws\DynamoDb\Exception\DynamoDbException;
    use Aws\DynamoDb\DynamoDbClient;
	use Aws\DynamoDb\Marshaler;
	
	$dynamodb = new DynamoDbClient([
        'region' => 'us-east-1',
        'version' => 'latest'
    ]);
	
	$marshaler = new Marshaler();
    $tableName = 'object_details';
	
	// Scanning the table, Listing and unmarshaling the data.
	function scan_data($dynamodb, $marshaler, $tableName){
		try{
		$result = $dynamodb->scan(array(
			'TableName' => $tableName 
		));
		
		foreach ($result['Items'] as $item) {
			$data = $marshaler->unmarshalItem($item);
			print_r($data);
		/*
			echo (isset($item['id']['N']) ? $item['id']['N'] : '');
			echo (isset($item['category']['S']) ? $item['category']['S'] : '');
			echo (isset($item['labels']['S']) ? $item['labels']['S'] : '');
			echo (isset($item['last_modified']['S']) ? $item['last_modified']['S'] : '');
			echo (isset($item['path']['S']) ? $item['path']['S'] : '');
			echo (isset($item['title']['S']) ? $item['title']['S'] : '');
		*/	
			echo "\n";
		 }
		
		} catch (DynamoDbException $e) {
			echo "Unable to scan table:\n";
			echo $e->getMessage() . "\n";
		}
	}
	
	// Marshaling the data and putting an item.
	function put_data($dynamodb, $marshaler, $tableName, $data){
		try {
		$dynamodb->putItem([
			'TableName' => $tableName,
			'Item'      => $marshaler->marshalItem($data)
		]);
		} catch (DynamoDbException $e) {
			echo "Unable to add item:\n";
			echo $e->getMessage() . "\n";
		}
	}
	
	// Getting an item and unmarshaling the data.
	function get_data($dynamodb, $marshaler, $tableName, $id){
		try{
		$result = $dynamodb->getItem([
			'TableName' => $tableName,
			'Key'       => ['id' => ['N' => $id]]
		]);
		
		$data = $marshaler->unmarshalItem($result['Item']);
		print_r($data);
		} catch (DynamoDbException $e) {
			echo "Unable to get item:\n";
			echo $e->getMessage() . "\n";
		}
	}

	// Update an item NEED TO BE UPDATED BUT WE MAY NOT NEED THIS
	/*
	function update_data($dynamodb, $marshaler, $tableName, $id, $data){
		try{
		$result = $dynamodb->updateItem([
			'TableName' => $tableName,
			'Key'       => ['id' => ['N' => $id]],
			'ConditionExpression' => 'attribute_exists(id)',
			'ExpressionAttributeValues' => [
				':category' => ['S' => 'Mobile'],
				':labels' => ['S' => 'hhhhhhhhh'],
				':last_modified' => ['S' => 'okokoko'],
				':path' => ['S' => ''],
				':title' => ['S' => ''],
				],
			'UpdateExpression' => 'SET category = :category',
			'ReturnValues' => 'ALL_NEW'
		]);
		
		print_r($result);
		} catch (DynamoDbException $e) {
			echo "Unable to update item:\n";
			echo $e->getMessage() . "\n";
		}
	}*/
	
	$id = 2015;
	$category = 'Movie';
	$labels = 'The, my, Big, New, Movie, Cinema';
	$today = date('Y-m-j h:i:s');  
	$data = [
		'id' => $id,
		'category' => $category,
		'labels' => $labels,
		'last_modified' => $today,
	];

//update_data($dynamodb, $marshaler, $tableName, '2015', 'Cinema');	
//scan_data($dynamodb, $marshaler, $tableName);
//get_data($dynamodb, $marshaler, $tableName, '0');
put_data($dynamodb, $marshaler, $tableName, $data);

?>
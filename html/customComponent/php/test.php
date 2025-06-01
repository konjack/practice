<?php

$test = [
	'name' => 'John',
	'age' => 20,
	'city' => 'New York',
	'country' => 'USA',
	'isAdmin' => true,
	'skills' => [
		'PHP',
		'JavaScript',
		'HTML',
		'CSS',
	],
];

echo json_encode($test);
?>
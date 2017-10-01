<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$lat = isset($_POST['lat']) ? $_POST['lat'] : null;
$lon = isset($_POST['lon']) ? $_POST['lon'] : null;
$rad = isset($_POST['rad']) ? $_POST['rad'] : null;
$sort = isset($_POST['sort']) ? $_POST['sort'] : null;

//$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
//$lon = isset($_GET['lon']) ? $_GET['lon'] : null;
//$rad = isset($_GET['rad']) ? $_GET['rad'] : null;
//$sort = isset($_GET['sort']) ? $_GET['sort'] : null;
//http://45.55.230.175/facebook/php/search.php?lat=44.986656&lon=-93.258133&sort=time&rad=2500

if($lat != null && $lon != null && $rad != null && $sort != null){

	//make sure to enter your own access token and update the url accordingly
	$url = "http://45.55.230.175:3000/events?lat=".$lat."&lng=".$lon."&distance=".$rad."&sort=".$sort."&accessToken=<YOUR ACCESS TOKEN>";

	//setup the request, you can also use CURLOPT_URL
	$ch = curl_init($url);

	// Returns the data/output as a string instead of raw data
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	//Set your auth headers
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json'
		));

	// get stringified data/output. See CURLOPT_RETURNTRANSFER
	$data = curl_exec($ch);

	// get info about the request
	$info = curl_getinfo($ch);

	// close curl resource to free up system resources 
	curl_close($ch);
	  
	echo($data);

}

?>
<?php

/* ----------------- E R R O R ---------------- */

// Error reporting ON.
ini_set('display_errors', 1);
error_reporting(~0);


/* --------------- G L O B A L S -------------- */

$output = array("error" => false,
			   "points" => NULL); // To be output as JSON.


/* ---------------- P O I N T S --------------- */

$sql = new SQLite3("snailkale.db");
$stmt = $sql->prepare("SELECT * FROM points");
$result = $stmt->execute();
if ($result) {
	if ($row = $result->fetchArray()) {
		$output['points'] = $row['points'];
	}
} else {
	$output["error"] = true;
	echo json_encode($output);
	return;
}
$stmt->close();
$sql->close();


echo json_encode($output);

?>
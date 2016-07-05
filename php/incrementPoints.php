<?php

/* ----------------- E R R O R ---------------- */

// Error reporting ON.
ini_set('display_errors', 1);
error_reporting(~0);


/* --------------- G L O B A L S -------------- */

$output = array("error" => false,
			   	"invalid" => false); // To be output as JSON.

// Points.
if ($_POST['points'] != NULL && is_numeric($_POST['points'])) {
	$points = $_POST['points'];
} else {
	$output['invalid'] = true;
	echo json_encode($output);
	return;
}


/* ------------- I N C R E M E N T ------------ */

// Increment.
$sql = new SQLite3("snailkale.db");
$stmt = $sql->prepare("UPDATE points SET points = (points + :points)");
$stmt->bindValue(":points", $points);
if (!$stmt->execute()) {
	$output["error"] = true;
}
$stmt->close();
$sql->close();


echo json_encode($output);

?>
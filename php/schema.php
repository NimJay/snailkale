<?php

// Authorization.
if ($_GET['password'] != "framenumber") {
	echo "<h3>Unauthorized; hence, database was not reset.</h3>";
	return;
}

// Error reporting ON.
ini_set('display_errors', 1);
error_reporting(~0);

// Open database (create if non-existent).
$db = new SQLite3('snailkale.db');

// Create tables for Users, Posts, Likes, and Flags.
$db->exec("DROP TABLE points;");
$db->exec("CREATE TABLE points (points INTEGER NOT NULL);");

// Insert the initial user, and posts.
$db->exec("INSERT INTO points (points) VALUES (0);");

?>

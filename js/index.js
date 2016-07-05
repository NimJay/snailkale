/**
 * Snail days.
 *
 * The canvas is 450px wide, 800px high.
 * Each block is 50px by 50px.
 */


var MIN_X = 0;
var MIN_Y = 0;
var MAX_X = 15;
var MAX_Y = 8;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var NOTES = [1, 3, 5, 6, 9, 7, 9, 6, 9, 7, 9, 5];


var canvas;
var ctx;


var x = 2; // Current x coordinate.
var y = 3; // Current y coordinate.
var o = RIGHT; // Orientation.
var trail = [];
var kale = [6, 5];
var points = 0;
var global = 0; // Global points.
var note = 0; // Note index.


/* ----- U P D A T E ----- */

var audio;
function update () {
	
	if (x == kale[0] && y == kale[1]) {
		points++;
		global++;
		updateGlobal();
		if (points % 3 == 0) incrementGlobal();
		document.cookie = points;
		document.getElementById('points').innerHTML = "" + points;
		respawnKale();
		note++;
		if (note == NOTES.length) {note = 0}
		tone = new Audio('music/' + NOTES[note] + '.mp3');
		tone.play();
	}
	
	draw();
}

function respawnKale () {
	kale[0] = Math.floor(Math.random() * (MAX_X + 1 - MIN_X) + MIN_X);
	kale[1] = Math.floor(Math.random() * (MAX_Y + 1 - MIN_Y) + MIN_Y);
	if (x == kale[0] && y == kale[1]) {respawnKale();}
}

/* ----- D R A W ----- */

function draw () {
	
	// Clear.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw Kale.
	ctx.fillStyle="rgb(140, 255, 140)"; // Green.
	var k = kale;
	ctx.fillRect(k[0] * 50, k[1] * 50, 50, 50);
	
	// Draw Snail.
	ctx.fillStyle="rgb(255, 140, 140)"; // Pink.
	ctx.fillRect(x * 50, y * 50, 50, 50);
	ctx.fillStyle="rgb(200, 200, 200)"; // Grey.
	if (o == LEFT) {ctx.fillRect(x * 50, y * 50, 10, 50);}
	if (o == UP) {ctx.fillRect(x * 50, y * 50, 50, 10);}
	if (o == RIGHT) {ctx.fillRect((x * 50) + 40, y * 50, 10, 50);}
	if (o == DOWN) {ctx.fillRect(x * 50, (y * 50) + 40, 50, 10);}
}

/* ----- G L O B A L ----- */

function getGlobal () {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			global = JSON.parse(xhttp.responseText).points;
			updateGlobal();
		}
	};
	xhttp.open("GET", "php/getPoints.php", true);
	xhttp.send();
}

function updateGlobal() {
	document.getElementById("global").innerHTML =  "All together, we've collected " + global + ".";
}

var lastIncrement = 0;
function incrementGlobal () {
	var increment = points - lastIncrement;
	lastIncrement = points;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "php/incrementPoints.php", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.responseText);
		}
	};
	xhttp.send("points=" + increment);
}

/* --------------- O N L O A D ---------------- */


window.onload = function () {
	
	
	// Canvas and context.
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	
	canvas.width = 800;
	canvas.height = 450;
	
	/* ----- O N K E Y U P ----- */
	window.onkeydown = function (e) {
		console.log(e.keyCode);
		
		// Spacebar.
		if (e.keyCode == 32) {
			
		}
		
		x -= 1 * (e.keyCode == LEFT && x > MIN_X);
		y -= 1 * (e.keyCode == UP && y > MIN_Y);
		x += 1 * (e.keyCode == RIGHT && x < MAX_X);
		y += 1 * (e.keyCode == DOWN && y < MAX_Y);
		if ([LEFT, UP, RIGHT, DOWN].indexOf(e.keyCode) != -1) o = e.keyCode;
		
		update();
	}
	
	if(!document.cookie) {
    	document.cookie = 0;
	} else {
		points = parseInt(document.cookie);
		document.getElementById('points').innerHTML = "" + points;
	}
	
	getGlobal();
	draw();
}
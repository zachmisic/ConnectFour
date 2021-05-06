//Width of entire canvas
var width = 1050;
//Height of entire canvas
var height = 900;
//How many moves have been completed
var moves = 0;
//Current color
var color = "";

var canvas = document.getElementById("myCanvas");
var cont = canvas.getContext("2d");

function buildGrid() {
    cont.strokeStyle = "#0040a6";
    for (let x = 0; x <= width; x += 150) {
        cont.moveTo(x, 0);
        cont.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += 150) {
        cont.moveTo(0, y);
        cont.lineTo(width, y);
    }
    cont.stroke();
}

function setColor() {
    if (moves % 2 == 0) {
        //Set color Red for circles
        cont.fillStyle = "#ff0000";
        cont.strokeStyle = "#ff0000";
        color = "R";
        document.getElementById("tracker").innerHTML = "Next Move: <span style=\"color:#ffff00;\">Yellow</span>";
    } else {
        //Set color Yellow for circles
        cont.fillStyle = "#ffff00";
        cont.strokeStyle = "#ffff00";
        color = "Y";
        document.getElementById("tracker").innerHTML = "Next Move: <span style=\"color:#ff0000;\">Red</span>";
    }
}

function drawCircle(x, y) {
    cont.beginPath();
    cont.arc(x, y, 70, 0, 2 * Math.PI, false);
    cont.fill();
    cont.lineWidth = 5;
    cont.stroke();
}

//Click event
canvas.addEventListener('click', function (event) {
    //Gets X value based on which column is clicked
    let x = event.pageX - (canvas.offsetLeft + canvas.clientLeft);
    x = Math.floor(x / 150);
    x = (x * 150) + 75;




    setColor();
    drawCircle(x, 75);
    moves++;

}, false);


buildGrid();




//Width of entire canvas
var width = 1050;
//Height of entire canvas
var height = 900;
//How many moves have been completed
var moves = 0;
//Current color
var color = "";

//Builds board matrix
var board = new Array(7);
for (var i = 0; i < 7; i++) {
    board[i] = new Array(6);
    for (var j = 0; j < 6; j++) {
        board[i][j] = "-";
    }
}
//How many pieces are in each column
var columnCounts = [0, 0, 0, 0, 0, 0, 0];

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

function checkRow(y) {
    let cnt = 0;
    let prevCol = "";
    let result = false;
    for (var x = 0; x < 7; x++) {
        if ((cnt == 0) && ((board[x][y] == "R") || (board[x][y] == "Y"))) {
            cnt++;
            prevCol = board[x][y];
        } else if (prevCol == board[x][y]) {
            cnt++
            if (cnt == 4) {
                result = true;
            }
        } else {
            cnt = 0;
        }
    }

    return (result);
}

function checkCol(x) {
    let cnt = 0;
    let prevCol = "";
    let result = false;
    for (var y = 0; y < 6; y++) {
        if ((cnt == 0) && ((board[x][y] == "R") || (board[x][y] == "Y"))) {
            cnt++;
            prevCol = board[x][y];
        } else if (prevCol == board[x][y]) {
            cnt++
            if (cnt == 4) {
                result = true;
            }
        } else {
            cnt = 0;
        }
    }
    
    return (result);
}

function checkLeftDiag(x, y) {
    let cnt = 0;
    let prevCol = "";
    let result = false;

    //move to top left of current diagonal
    while ((x>0) && (y>0)) {
        x--;
        y--;
    }

    //move to bottom right of diagonal counting consecutives
    while ((x < 6) && (y < 5)) {
        if ((cnt == 0) && ((board[x][y] == "R") || (board[x][y] == "Y"))) {
            cnt++;
            prevCol = board[x][y];
        } else if (prevCol == board[x][y]) {
            cnt++
            if (cnt == 4) {
                result = true;
            }
        } else {
            cnt = 0;
        }
        x++;
        y++;
    }

    return result;
}

function checkRightDiag(x, y) {
    let cnt = 0;
    let prevCol = "";
    let result = false;

    //move to top right of current diagonal
    while ((x < 6) && (y > 0)) {
        x++;
        y--;
    }

    //move to bottom left of diagonal counting consecutives
    while ((x > 0) && (y < 5)) {
        if ((cnt == 0) && ((board[x][y] == "R") || (board[x][y] == "Y"))) {
            cnt++;
            prevCol = board[x][y];
        } else if (prevCol == board[x][y]) {
            cnt++
            if (cnt == 4) {
                result = true;
            }
        } else {
            cnt = 0;
        }
        x--;
        y++;
    }

    return result;
}

function checkWin(x, y) {
    let winStatus = false;
    if (checkRow(y) == true) {winStatus = true;}
    if (checkCol(x) == true) { winStatus = true; }
    if (checkLeftDiag(x, y) == true) { winStatus = true; }
    if (checkRightDiag(x, y) == true) { winStatus = true; }

    if (winStatus == true) {
        moves--;
        setColor();
        alert("Winner: "+color);
    }
}

//Click event
canvas.addEventListener('click', function (event) {
    //Gets X value based on which column is clicked
    let x = event.pageX - (canvas.offsetLeft + canvas.clientLeft);
    x = Math.floor(x / 150);
    let x_pos = (x * 150) + 75;

    //Gets Y based on how many other pieces are in that column
    let y = columnCounts[x];
    //Only adds piece if there is room in the column
    if (columnCounts[x] < 6) {
        columnCounts[x]++;
        let y_pos = 825 - (y * 150);

        setColor();
        board[x][y] = color;
        drawCircle(x_pos, y_pos);
        moves++;
        checkWin(x, y);
    }
}, false);


buildGrid();




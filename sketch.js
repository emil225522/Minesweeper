
function make2DArray(cols, rows) {
  var array = new Array(cols);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

var grid;
var cols;
var rows;
var w = 60;


function setup() {
  createCanvas(801, 801);
  cols = 20;
  rows = 20;
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i*w, j*w, w);
    }
  }
  
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].bomb) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
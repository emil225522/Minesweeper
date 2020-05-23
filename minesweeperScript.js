
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
var w = 50;
var revealedCount;
var amountOfBombs = 0;
var maxBomb = 20;
var gameWon = false;


function setup() {
  var amountOfBombs = 0;
  createCanvas(601, 601);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (floor(Math.random() * 7) == 5 && amountOfBombs < maxBomb) {
        grid[i][j].bomb = true;
        amountOfBombs++;
      }
      else {
        grid[i][j].bomb = false;
      }
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
}

function mousePressed() {

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (mouseButton == LEFT) {

          grid[i][j].reveal();

          if (grid[i][j].bomb) {
            gameOver();
          }
        }
        else if (mouseButton == RIGHT) {
          grid[i][j].flagged = !grid[i][j].flagged;
        }
      }
    }
  }
  revealedCount = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].revealed) {
        revealedCount++;
      }
    }
  }
  console.log(revealedCount);
  if (revealedCount == cols*rows -maxBomb){
    winGame();
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  setTimeout( function ( ) { alert( "You have lost!" ); }, 100 );
}
function winGame(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  setTimeout( function ( ) { alert( "You have won!" ); }, 100 );
  }


function draw() {
  background(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
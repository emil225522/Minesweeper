
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
var w = 40;
var revealedCount;
var amountOfBombs = 0;
var maxBomb = 15;
var gameWon = false;
var difficulty = 1;
var timer = 0;
var hold = false;
var justFlagged = false;
var gameBegun = false;


function setup() {
  gameBegun = false;
  maxBomb = 15 * difficulty + 5;
  var amountOfBombs = 0;
  if (difficulty == 1)
    var cvs = createCanvas(561, 561);
  else if (difficulty == 2)
    var cvs = createCanvas(681, 681);
  else if (difficulty == 3)
    var cvs = createCanvas(761, 761);
  cvs.parent("bajs")
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
      grid[i][j].bomb = false;
    }
  }
  var randI;
  var randJ;

  while (amountOfBombs < maxBomb) {
    randI = floor(Math.random() * cols);
    randJ = floor(Math.random() * rows);
    if (floor(Math.random() * (9 - maxBomb / 10)) == 2) {
      while (!grid[randI][randJ].bomb) {
        grid[randI][randJ].bomb = true;
        amountOfBombs++;
      }
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
}
function touchstart() {
  hold = true;
}
function touchend() {
  //stops short touches from firing the event
  mouseReleased();
  }

function mousePressed() {
  hold = true;
}
function mouseReleased() {
  hold = false;
  timer = 0;
  if (justFlagged == false){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (mouseButton == LEFT) {

          grid[i][j].reveal();

          if (grid[i][j].bomb && gameBegun) {
            gameOver();
          }
          else{
            gameBegun = true;
            grid[i][j].bomb = false;
            grid[i][j].reveal();
          }
        }
        else if (mouseButton == RIGHT) {
          grid[i][j].flagged = !grid[i][j].flagged;
        }
      }
    }
  }
}
justFlagged = false;
  revealedCount = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].revealed) {
        revealedCount++;
      }
    }
  }
  if (revealedCount == cols * rows - maxBomb) {
    winGame();
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  setTimeout(function () { alert("You have lost!"); setup(); }, 100);
}
function winGame() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  setTimeout(function () { alert("You have won!"); }, 100);
}


function draw() {
  background(0);
  if (hold == true) {
    console.log("hesa" + timer);
    timer++;
    if (timer > 10) {

      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          if (grid[i][j].contains(mouseX, mouseY) && justFlagged == false) {
            grid[i][j].flagged = !grid[i][j].flagged;
            justFlagged = true;
            break;
          }
        }
      }
    }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
function setDifficulty(difficulty) {
  this.difficulty = difficulty;
  setup();
}
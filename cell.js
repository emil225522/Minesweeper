function Cell(x, y, w) {

  this.w = w;
  this.x = x * w;
  this.y = y * w;
  this.indexX = x;
  this.indexY = y;
  this.neighborCount = 0;
  this.bomb = false;
  this.flagged = false;


  this.revealed = false;
}
Cell.prototype.show = function () {
  
  textFont('Georgia');
  textSize(26);
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.bomb) {
      fill(127);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    }
    else {
      fill(254);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        stroke(0);
        fill(0);
        switch(this.neighborCount) {
          case 1:
            fill(0,0,255);
            stroke(0,0,150);
            break;
          case 2:
            fill(0,150,0);
            stroke(0,100,0);
            break;
          case 3:
            fill(255,0,0);
            stroke(200,0,0);
            break;
          case 4:
            fill(0,0,150);
            stroke(0,0,100);
            break;
          case 5:
            fill(82,3,1);
            stroke(50,0,0);
            break;
          case 6:
            fill(255,0,255);
            stroke(200,0,200);
            break;
            // code block
        }
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
  else {
    fill(200);
    rect(this.x, this.y, this.w, this.w);
    if (this.flagged){
      fill(255,150,0);
      //creates a triangles, uhh this was harder than it should have been
      triangle(this.x +5, this.y + this.w - 5 ,this.x + this.w/2,this.y + 5,this.x + this.w - 5, this.y + this.w - 5);
    }
    
  }
};
Cell.prototype.countBombs = function () {
  if (this.bomb) {
    return this.neighborCount = -1;
  }
  var total = 0;
  for (var x = -1; x <= 1; x++) {
    var neighborX = this.indexX + x;

    for (var y = -1; y <= 1; y++) {
      var neighborY = this.indexY + y;

      if (neighborX >= 0 && neighborX < rows) {
        if (neighborY >= 0 && neighborY < cols) {
          var neighbor = grid[neighborX][neighborY];
          if (neighbor.bomb) {
            total++;
          }
        }
      }
    }
  }
  this.neighborCount = total;
};
Cell.prototype.reveal = function () {
  this.revealed = true;
  this.recReveal();
};
Cell.prototype.recReveal = function () {
  if (this.neighborCount != 0) {
    return;
  }
  for (var x = -1; x <= 1; x++) {
    var neighborX = this.indexX + x;

    for (var y = -1; y <= 1; y++) {
      var neighborY = this.indexY + y;

      if (neighborX >= 0 && neighborX < rows) {
        if (neighborY >= 0 && neighborY < cols) {
          var neighbor = grid[neighborX][neighborY];
          if (!neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
  }
  return;
}
Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
};
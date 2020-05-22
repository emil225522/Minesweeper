function Cell(x, y, w) {

  this.w = w;
  this.x = x * w;
  this.y = y * w;
  this.indexX = x;
  this.indexY = y;
  this.neighborCount = 0;
  this.bomb = false;


  this.revealed = false;
}
Cell.prototype.show = function () {
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
        fill(5);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
  else {
    fill(200);
    rect(this.x, this.y, this.w, this.w);
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
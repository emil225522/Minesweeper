function Cell(x, y, w) {

  this.w = w;
  this.x = x*w;
  this.y = y*w;
  this.indexX = x;
  this.indexY = y;
  this.neighborCount = 0;

  if (floor(Math.random() * 10) == 5) {
    this.bomb = true;
  }
  else {
    this.bomb = false;
  }
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
        fill(0);
        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
      }
    }
  }
  else {
    fill(200);
    rect(this.x, this.y, this.w, this.w);
    text(this.indexX + " " + this.indexY, this.x + this.w * 0.5, this.y + this.w - 6);
  }
};
Cell.prototype.countBombs = function(){
if (this.bomb){
  return this.neighborCount = -1;
}
var total = 0;
for(var i = -1;i <= 1;i++){
  var i
}

}
Cell.prototype.reveal = function () {
  this.revealed = true;
};
Cell.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
};
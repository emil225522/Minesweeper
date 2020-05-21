function Cell (x,y,w){
  this.x = x;
  this.y = y;
  this.w = w;
  this.bomb = false;
  this.revealed = false;
}
Cell.prototype.show = function() {
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
else{
  fill(200);
      rect(this.x, this.y, this.w, this.w);
}
};
Cell.prototype.reveal = function() {
  this.revealed = true;
};
Cell.prototype.contains = function(x,y) {
 return ( x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
};
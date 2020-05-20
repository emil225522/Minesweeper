var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var player = new Image();
var bg = new Image();

player.src = "images/chung.png";
ctx.beginPath();
ctx.rect(0, 0, 2000, 2000);
ctx.fillStyle = "gray";




// some variables

var constant;

var x = 10;
var y = 150;

var dx = 0;
var dy = 0;

var gravity = 1;
var KeyboardHelper = { left: 37, up: 38, right: 39, down: 40 };

// audio files
var fly = new Audio();
fly.src = "sounds/fly.mp3";


// on key down
document.addEventListener("keydown",handleKeyDown);


function handleKeyDown(){

    if (event.keyCode == KeyboardHelper.up){
    dy -= 10;
    fly.play();
    }
    else if(event.keyCode == KeyboardHelper.right){
    dx += 10;
    fly.play();
    }
    else if(event.keyCode == KeyboardHelper.left){
    dx -= 10;
    fly.play();
  }
  else if(event.keyCode == KeyboardHelper.down){
    dy += 10;
    fly.play();
  }
}

// draw images

function draw(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.fillStyle = "#505050"
    ctx.fill();
    if (dx > 10)
    dx = 10;
    if (dy > 10)
    dy = 10;
    if (dy < -10)
    dy = -10;
    if(dx < -10)
    dx = -10;
    x += dx;
    y += dy;


    
    ctx.drawImage(player,x,y);
    
    y += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    
    requestAnimationFrame(draw);
    
}

draw();

























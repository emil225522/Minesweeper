
const board_border = 'black';
const board_background = "lightgray";
const snake_col = 'green';
const snake_border = 'black';
const board = document.getElementById("gameCanvas");
const board_ctx = gameCanvas.getContext("2d");

let snake = [{ x: 200, y: 200 }, { x: 190, y: 200 }, {   x: 180, y: 200 }];

main();

// main function called repeatedly to keep the game running
function main() {
    clearCanvas();
    drawSnake();
}


// draw a border around the canvas
function clearCanvas() {
    //  Select the colour to fill the drawing
    board_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    board_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    board_ctx.fillRect(0, 0, board.width, board.height);
    // Draw a "border" around the entire canvas
    board_ctx.strokeRect(0, 0, board.width, board.height);
}

function drawSnakePart(snakePart) {
    board_ctx.fillStyle = 'lightblue';
    board_ctx.strokestyle = 'darkblue';
    board_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    board_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(drawSnakePart);
}
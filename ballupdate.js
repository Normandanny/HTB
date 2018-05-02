// Set up the ball
var ballDefault; // Default ball
var bx = 300; // X position of the ball
var by = 500; // Y position of the ball
var br = 20; // Ball radius
var mx = 3; // Movement on the X axis
var my = 4; // Movement on the Y axis

// Set up the paddle
var px = 300;
var py = 595;
var pw = 100;
var ph = 10;

// Set up the bricks
var brickRowCount = 7;
var brickColumnCount = 8;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 20;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

var gameOver = false;
var directChange = false;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    ballDefault = new Ball(bx, by, br, mx, my, width, height, pw, ph);
}

function draw() {
    background('#FAE9DE');

    // Draw bricks
    drawBricks();

    // Draw paddle
    drawPaddle();

    // Brick collision detection
    collisionDetection();

    // Draw ball
    ballDefault.px = px; // Pass real-time paddle position into ballDefault
    ballDefault.show();
    ballDefault.move();

    if (gameOver) {
        background('#333333');
        textSize(32);
        textAlign(CENTER);
        fill(255);
        text("GAME OVER", width / 2, height / 2);
    }

    directChange = false;
}


// Paddle function
function drawPaddle() {
    fill('#EA6B65');
    noStroke();
    rectMode(CENTER);
    rect(px, py, pw, ph);

    if (keyIsDown(LEFT_ARROW) && px - pw / 2 >= 0) {
        px = px - 10;
    }
    if (keyIsDown(RIGHT_ARROW) && px + pw / 2 <= width) {
        px = px + 10;
    }
}

// Brick function
function drawBricks() {
    rectMode(CORNER);
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                fill('#203E53');
                rect(brickX, brickY, brickWidth, brickHeight);
            }
        }
    }
}

// Brick collision detection function
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (ballDefault.x > b.x && ballDefault.x < b.x + brickWidth && ballDefault.y > b.y && ballDefault.y < b.y + brickHeight) {
                    directChange = true;
                    b.status = 0;
                }
            }
        }
    }
}

class Ball {
    constructor(ballX, ballY, ballRadius, moveX, moveY, canvasWidth, canvasHeight, paddleWidth, paddleHeight) {
        this.x = ballX;
        this.y = ballY;
        this.r = ballRadius;
        this.mx = moveX;
        this.my = moveY;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.px;
        this.pw = paddleWidth;
        this.ph = paddleHeight;
        this.acc = 0.50; // Acceleration
    }

    show() {
        // this.ball = document.createElement("div");
        // this.ball.innerHTML = this.count;
        // this.body.appendChild(this.ball);
        fill('#F2B55F');
        noStroke();

        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.r);
    }

    move() {
        // Movement
        this.x = this.x - this.mx;
        this.y = this.y - this.my;

        // Wall and paddle collision detection
        if (this.x - this.mx > this.width - this.r / 2 || this.x < 0 + this.r / 2) {
            this.mx = -this.mx;
        }
        if (this.y < 0 + this.r / 2) {
            this.my = -this.my;
        }
        if (this.y - this.my > this.height - this.r / 2 - this.ph && this.x <= this.px + this.pw / 2 && this.x >= this.px - this.pw / 2) {
            this.my = -this.my;
        }
        if (this.y - this.my > this.height - this.r / 2) {
            gameOver = true;
        } else if (directChange) {
            this.my = -this.my;
        }
    }
}

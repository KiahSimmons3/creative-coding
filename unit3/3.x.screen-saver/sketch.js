let img;  // Variable to store the image
let x = 50;
let y = 50;
let xSpeed = 5;
let ySpeed = 5;

function preload() {
  // Load the image before setup()
  img = loadImage('https://static.vecteezy.com/system/resources/thumbnails/031/098/051/small_2x/pixel-art-deep-sea-jellyfish-png.png');  // Replace with your image file path
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Create a full-screen canvas
  noStroke();  // Remove borders on shapes
}

function draw() {
  background(0);  // Black background

  // Update position
  x += xSpeed;
  y += ySpeed;

  // Bounce the image off the edges
  if (x <= 0 || x >= width - img.width) {
    xSpeed = -xSpeed;
  }
  if (y <= 0 || y >= height - img.height) {
    ySpeed = -ySpeed;
  }

  // Draw the image
  image(img, x, y);
}

// Stop the screensaver if the user clicks or presses a key
function mousePressed() {
  noLoop();  // Stops the animation loop
}

function keyPressed() {
  noLoop();  // Stops the animation loop
}

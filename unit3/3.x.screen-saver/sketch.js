let img;  // Variable to store the image
let x = 50;
let y = 50;
let xSpeed = 5;
let ySpeed = 5;

let bubbles = [];  // Array to store bubble objects

function preload() {
  // Load the image before setup()
  img = loadImage('https://static.vecteezy.com/system/resources/thumbnails/031/098/051/small_2x/pixel-art-deep-sea-jellyfish-png.png');  // Replace with your image file path
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Create a full-screen canvas
  noStroke();  // Remove borders on shapes
  
  // Create initial bubbles
  for (let i = 0; i < 5; i++) {
    bubbles.push(new Bubble(random(width), random(height), random(30, 70)));  // Random position and size
  }
}

function draw() {
  // Create a vertical gradient background
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color('#ADD8E6'), color('#00008B'), inter); // Light blue to dark blue
    c = lerpColor(c, color('#000000'), inter * 0.5); // Blend towards black
    stroke(c);
    line(0, i, width, i);
  }

  // Update and draw all bubbles (behind the jellyfish image)
  for (let bubble of bubbles) {
    bubble.update();
    bubble.display();
  }

  // Update position of jellyfish
  x += xSpeed;
  y += ySpeed;

  // Bounce the image off the edges
  if (x <= 0 || x >= width - img.width) {
    xSpeed = -xSpeed;
  }
  if (y <= 0 || y >= height - img.height) {
    ySpeed = -ySpeed;
  }

  // Draw the image (on top of the bubbles)
  image(img, x, y);
}

// Bubble class to define bubble properties and behavior
class Bubble {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.xSpeed = random(-1, 1);  // Slow horizontal speed
    this.ySpeed = random(-0.5, 0.5);  // Slow vertical speed
    this.alpha = random(50, 100);  // More transparency (lower alpha value)
  }

  // Update the bubble's position
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce off edges
    if (this.x <= 0 || this.x >= width) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y <= 0 || this.y >= height) {
      this.ySpeed = -this.ySpeed;
    }
  }

  // Display the bubble
  display() {
    fill(255, 255, 255, this.alpha);  // White with more transparency
    noStroke();  // No border around the bubble
    ellipse(this.x, this.y, this.diameter, this.diameter);  // Draw the circle
  }
}

// Stop the screensaver if the user clicks or presses a key
function mousePressed() {
  noLoop();  // Stops the animation loop
}

function keyPressed() {
  noLoop();  // Stops the animation loop
}

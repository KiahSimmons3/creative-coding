let ripplers = []; // Array to store ripple objects

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background("#ADD8E6");

  // Loop through each rippler in the array and call its draw method
  for (let i = ripplers.length - 1; i >= 0; i--) {
    ripplers[i].draw();
    if (ripplers[i].isFaded()) {
      ripplers.splice(i, 1); // Remove the ripple if it fades out
    }
  }
}

// Capture mouse clicks to create new ripplers
function mousePressed() {
  ripplers.push(new Rippler(mouseX, mouseY));
}

// Rippler class to define ripple properties and behavior
class Rippler {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameters = [0]; // Array to hold diameters for concentric circles
    this.opacity = 150; // Initial opacity for fading effect
  }

  // Draw method to update the ripple's rings and fading effect
  draw() {
    noFill();
    stroke(0, this.opacity);
    strokeWeight(2);

    // Loop through each diameter to draw concentric circles
    for (let i = 0; i < this.diameters.length; i++) {
      ellipse(this.x, this.y, this.diameters[i]);
      this.diameters[i] += 2; // Increase the diameter for each circle
    }

    // Add a new ring every few frames for the wave effect
    if (frameCount % 10 === 0) {
      this.diameters.push(0);
    }

    // Decrease opacity gradually
    this.opacity -= 1;

    // Check for boundaries and reflect
    for (let i = 0; i < this.diameters.length; i++) {
      if (this.x + this.diameters[i] / 2 >= width || this.x - this.diameters[i] / 2 <= 0) {
        this.diameters[i] *= -1;
      }
      if (this.y + this.diameters[i] / 2 >= height || this.y - this.diameters[i] / 2 <= 0) {
        this.diameters[i] *= -1;
      }
    }
  }

  // Check if the ripple has faded completely
  isFaded() {
    return this.opacity <= 0;
  }
}

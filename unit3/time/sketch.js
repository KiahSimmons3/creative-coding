//Okay so. The flower thing didn't work out! I could not for the life of me get it to
//do what i wanted, so i started all over again and instead made a landscape that was easier to keep
//track of!! The trees represent the hours in military time, and a new one should be added whe  the 
//hour rolls over. the fireflies count up the seconds, and reset when the seconds roll over
//and the moon moves left to right to keep track of the minuites, and resets its position when the hour rolls over!!
//i hope it is way better than the flowers!!
//Kiah Simmons 12/11/2024

let trees = [];
let fireflies = [];
let lastNumTrees = -1; // Track the last number of trees to detect changes
let fireflyCounter = 1; // Start counting fireflies from 1
let lastSecond = -1; // Track the last second to detect when the second changes

let moonX; // Variable to hold the X position of the moon
let lastMinute = -1; // Track the last minute to detect changes

function setup() {
  createCanvas(800, 600);
  noStroke();
  initializeTrees();  // Initialize the trees 
  initializeFireflies();  // Initialize the fireflies
  moonX = 0; // Start the moon on the left side of the screen
}

function draw() {
  // Set the background to a dark color
  background(10, 30, 50);

  // Get the current number of trees based on the current hour
  const NUM_TREES = hour();  // Set the number of trees to the current hour
  const maxTrees = max(NUM_TREES, 1);  // Ensure at least one tree

  // Only update the trees if the number of trees has changed
  if (maxTrees !== lastNumTrees) {
    lastNumTrees = maxTrees;
    initializeTrees();  // Reinitialize the trees with the new count
  }

  // Get the current second
  const currentSecond = second();

  // If the second has changed, update the firefly count
  if (currentSecond !== lastSecond) {
    lastSecond = currentSecond;
    
    // If second reaches 59, reset firefly counter to 1
    if (currentSecond === 59) {
      fireflyCounter = 1;
    } else {
      // Otherwise, increment firefly count until 59
      fireflyCounter = min(fireflyCounter + 1, 59);
    }

    initializeFireflies();  // Reinitialize fireflies with the new count
  }

  // Get the current minute
  const currentMinute = minute();

  // If the minute has changed, update the moon position
  if (currentMinute !== lastMinute) {
    lastMinute = currentMinute;
    // Map the current minute to a position between 0 and width (800)
    moonX = map(currentMinute, 0, 59, 0, width);
  }

  // Draw trees with bioluminescent glow based on the hour
  for (let tree of trees) {
    tree.glow = map(hour(), 0, 23, 50, 255);
    fill(50, 30, 20);
    rect(tree.x - 10, tree.y, 20, height - tree.y);
    fill(0, tree.glow, tree.glow / 2, 150);
    ellipse(tree.x, tree.y, 100, 100);
  }

  // Draw fireflies
  for (let firefly of fireflies) {
    // Fireflies do NOT blink until the fireflyCounter reaches 59
    if (fireflyCounter === 59) {
      // Start blinking if the counter reaches 59
      firefly.blinkTimer -= 1;
      if (firefly.blinkTimer <= 0) {
        firefly.brightness = firefly.brightness === 0 ? random(100, 255) : 0;
        firefly.blinkTimer = random(30, 60);
      }
    } else {
      // Keep the fireflies fully visible before the counter reaches 59
      firefly.brightness = 255;
    }

    // Draw the firefly
    fill(255, 255, 100, firefly.brightness);
    ellipse(firefly.x, firefly.y, 5, 5);

    // Move the firefly slightly
    firefly.x += random(-1, 1);
    firefly.y += random(-1, 1);

    // Wrap around edges
    if (firefly.x < 0) firefly.x = width;
    if (firefly.x > width) firefly.x = 0;
    if (firefly.y < 0) firefly.y = height - 200;
    if (firefly.y > height - 200) firefly.y = 0;
  }

  // Draw the crescent moon at the calculated position
  drawCrescentMoon(moonX, height / 4); // Adjust the Y position if needed
}

// Function to initialize the trees based on the current number of trees
function initializeTrees() {
  trees = [];  // Clear the previous trees
  const NUM_TREES = hour();  // Get the current hour-based tree count
  const maxTrees = max(NUM_TREES, 1);  // Ensure at least one tree

  // Initialize trees with random positions
  for (let i = 0; i < maxTrees; i++) {
    trees.push({
      x: random(width),
      y: height - random(100, 200),
      glow: 0,
    });
  }
}

// Function to initialize the fireflies based on the current firefly count
function initializeFireflies() {
  fireflies = [];  // Clear the previous fireflies

  // Initialize fireflies with random positions and random states
  for (let i = 0; i < fireflyCounter; i++) {
    fireflies.push({
      x: random(width),
      y: random(height - 200),
      brightness: 255,  // Start fully visible
      blinkTimer: random(0, 60),
    });
  }
}

// Function to draw the crescent moon
function drawCrescentMoon(x, y) {
  // Draw the moon with a crescent shape by overlapping two circles
  fill(255, 255, 200); // Light yellow for the moon
  ellipse(x, y, 80, 80); // Main moon circle

  // Draw a smaller circle to create the crescent effect
  fill(10, 10, 20); // Dark color for the shadowed part of the moon
  ellipse(x + 20, y, 80, 80); // Offset circle for the crescent effect
}

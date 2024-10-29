let speedfactor = 3;
let xspeed, yspeed;
let x, y; // Follower's position
let img;
let goalX, goalY, safeX, safeY; // Goal and safe zone positions
let score = 0;

function preload() {
  img = loadImage('https://static.vecteezy.com/system/resources/thumbnails/028/651/876/small_2x/pixel-art-cartoon-fish-character-png.png'); // Image
}

function setup() {
  createCanvas(800, 800);
  x = random(width);
  y = random(height);
  xspeed = speedfactor;
  yspeed = speedfactor;
  goalX = random(50, width - 50);
  goalY = random(50, height - 50);
  safeX = random(50, width - 50);
  safeY = random(50, height - 50);
  imageMode(CENTER);
}

function draw() {
  background("#0096C7");

  // Draw goal and safe zones
  fill("#FFEE8C"); // yellow goal zone
  ellipse(goalX, goalY, 50, 50);
  fill("#001833"); // Blue safe zone
  ellipse(safeX, safeY, 100, 100);

  // Display score
  fill("white");
  textSize(20);
  text("Score: " + score, 10, 30);

  // Calculate angle towards mouse and update follower position
  let angle = atan2(mouseY - y, mouseX - x);
  x += cos(angle) * xspeed;
  y += sin(angle) * yspeed;

  // Draw follower image
  image(img, x, y, 50, 50); // Adjust size if needed

  // Check distance to the safe zone
  let distanceToSafe = dist(mouseX, mouseY, safeX, safeY);
  let isInSafeZone = distanceToSafe < 50;

  // Check for "catch" distance if the mouse is NOT in the safe zone
  let distanceToMouse = dist(mouseX, mouseY, x, y);
  if (distanceToMouse < 20 && !isInSafeZone) {
    // Reset follower to a random position
    x = random(width);
    y = random(height);
    score -= 1;
  }

  // Check if mouse is in the goal zone
  let distanceToGoal = dist(mouseX, mouseY, goalX, goalY);
  if (distanceToGoal < 25) {
    score += 1;
    // Reset goal position
    goalX = random(50, width - 50);
    goalY = random(50, height - 50);
  }

  // Display "Safe Zone!" text if mouse is in the safe zone
  if (isInSafeZone) {
    fill("#FFEE8C");
    text("Safe Zone!", safeX - 60, safeY - 60);
  }
}

let speedfactor = 3;
let xspeeds = [], yspeeds = [];
let positions = []; // Array to hold each follower's position
let img;
let goalX, goalY, safeX, safeY; // Goal and safe zone positions
let score = 0;
let followerCount = 3; // Number of followers

function preload() {
  img = loadImage('https://static.vecteezy.com/system/resources/thumbnails/028/651/876/small_2x/pixel-art-cartoon-fish-character-png.png'); // Image
}

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < followerCount; i++) {
    positions.push({ x: random(width), y: random(height) });
    xspeeds.push(speedfactor);
    yspeeds.push(speedfactor);
  }
  goalX = random(50, width - 50);
  goalY = random(50, height - 50);
  safeX = random(50, width - 50);
  safeY = random(50, height - 50);
  imageMode(CENTER);
}

function draw() {
  background("#0096C7");

  // Draw goal and safe zones
  fill("#FFEE8C"); // Yellow goal zone
  ellipse(goalX, goalY, 50, 50);
  fill("#001833"); // Blue safe zone
  ellipse(safeX, safeY, 100, 100);

  // Display score
  fill("white");
  textSize(20);
  text("Score: " + score, 10, 30);

  let distanceToSafe = dist(mouseX, mouseY, safeX, safeY);
  let isInSafeZone = distanceToSafe < 50;

  // Update and draw each follower
  for (let i = 0; i < followerCount; i++) {
    let follower = positions[i];

    // Calculate angle towards mouse and update position
    let angle = atan2(mouseY - follower.y, mouseX - follower.x);
    follower.x += cos(angle) * xspeeds[i];
    follower.y += sin(angle) * yspeeds[i];

    // Prevent followers from leaving the canvas
    follower.x = constrain(follower.x, 0, width);
    follower.y = constrain(follower.y, 0, height);

    // Draw follower image
    image(img, follower.x, follower.y, 50, 50); // Adjust size if needed

    // Check for "catch" distance if the mouse is NOT in the safe zone
    let distanceToMouse = dist(mouseX, mouseY, follower.x, follower.y);
    if (distanceToMouse < 20 && !isInSafeZone) {
      // Reset follower to a random position
      follower.x = random(width);
      follower.y = random(height);
      score -= 1;
    }
  }

  // Check if mouse is in the goal zone
  let distanceToGoal = dist(mouseX, mouseY, goalX, goalY);
  if (distanceToGoal < 25) {
    score += 1;
    // Reset goal position
    goalX = random(50, width - 50);
    goalY = random(50, height - 50);

    // Respawn all followers at random positions
    for (let i = 0; i < followerCount; i++) {
      positions[i].x = random(width);
      positions[i].y = random(height);
    }
  }

  // Display "Safe Zone!" text if mouse is in the safe zone
  if (isInSafeZone) {
    fill("#FFEE8C");
    text("Safe Zone!", safeX - 60, safeY - 60);
  }
}

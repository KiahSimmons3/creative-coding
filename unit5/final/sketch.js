let fish;
let fishImage, starImage, obstacleImage, obstacle2Image, obstacle3Image;
let obstacles = [];
let obstacles2 = [];
let obstacles3 = [];
let stars = [];
let score = 0;
let gameOver = false;

function preload() {
  // Load images in preload() to ensure they are ready before setup
  fishImage = loadImage('https://f2.toyhou.se/file/f2-toyhou-se/images/92548560_PBwFpjwzf4Y8d7J.png');
  starImage = loadImage('https://f2.toyhou.se/file/f2-toyhou-se/images/92548768_pCIoqkzy7NoDN6g.png'); // Replace with actual star image URL
  obstacleImage = loadImage('https://f2.toyhou.se/file/f2-toyhou-se/images/92548592_FfkEp8K9woKZRYW.png'); // Replace with actual obstacle image URL
  obstacle2Image = loadImage('https://f2.toyhou.se/file/f2-toyhou-se/images/92548612_7LqXkNjUO9spJuT.png'); // Replace with actual obstacle 2 image URL
  obstacle3Image = loadImage('https://f2.toyhou.se/file/f2-toyhou-se/images/92548601_SMZbg0bHs4bXluc.png'); // Replace with actual obstacle 3 image URL
}

function setup() {
  createCanvas(600, 800);  // Increased canvas size
  fish = new Fish();
  frameRate(60);
}

function draw() {
  if (!gameOver) {
    background(100, 150, 255); // River background
    fish.update();
    fish.display();

    // Generate regular obstacles
    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    // Generate the second set of obstacles (darker green)
    if (frameCount % 120 === 0) {
      obstacles2.push(new Obstacle2());
    }

    // Generate the third set of obstacles (with less frequency)
    if (frameCount % 180 === 0) {
      obstacles3.push(new Obstacle3());
    }

    // Generate stars every 50 frames (doubled spawn rate)
    if (frameCount % 50 === 0) {
      stars.push(new Star());
    }

    // Move and check collisions for regular obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].display();

      // Check for collision with regular obstacles
      if (fish.collidesWith(obstacles[i])) {
        gameOver = true;
      }

      // Remove off-screen obstacles
      if (obstacles[i].isOffScreen()) {
        obstacles.splice(i, 1);
      }
    }

    // Move and check collisions for darker green obstacles
    for (let i = obstacles2.length - 1; i >= 0; i--) {
      obstacles2[i].update();
      obstacles2[i].display();

      // Check for collision with darker green obstacles
      if (fish.collidesWith(obstacles2[i])) {
        gameOver = true;
      }

      // Remove off-screen obstacles
      if (obstacles2[i].isOffScreen()) {
        obstacles2.splice(i, 1);
      }
    }

    // Move and check collisions for the third set of obstacles
    for (let i = obstacles3.length - 1; i >= 0; i--) {
      obstacles3[i].update();
      obstacles3[i].display();

      // Check for collision with the third set of obstacles
      if (fish.collidesWith(obstacles3[i])) {
        gameOver = true;
      }

      // Remove off-screen obstacles
      if (obstacles3[i].isOffScreen()) {
        obstacles3.splice(i, 1);
      }
    }

    // Check for collision with stars
// Check for collision with stars
for (let i = stars.length - 1; i >= 0; i--) {
  stars[i].update();
  stars[i].display();

  // Check if the fish collects the star only when they collide directly
  if (fish.collidesWith(stars[i])) {
    score += 10; // Increase score by 10 when collected
    stars.splice(i, 1); // Remove the star from the array
  }

  // Remove off-screen stars
  if (stars[i].isOffScreen()) {
    stars.splice(i, 1);
  }
}


    // Display score
    fill(255);
    textSize(32);
    textAlign(RIGHT);
    text(score, width - 20, 40);

  } else {
    // Game Over screen
    fill(0, 0, 0, 150);
    rect(0, 0, width, height);
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(32);
    text("Score: " + score, width / 2, height / 2 + 40);
  }
}

function mousePressed() {
  if (!gameOver) {
    fish.swimUp();
  }
}

function mouseReleased() {
  if (!gameOver) {
    fish.stopSwimming();
  }
}

class Fish {
  constructor() {
    this.x = width / 4;
    this.y = height / 2;
    this.size = 50; // Fish size
    this.velocity = 0;
    this.lift = -6; // Controls how strong the swim-up movement is
    this.gravity = 0.3;
  }

  update() {
    if (mouseIsPressed) {
      this.swimUp(); // Constant upward movement when the mouse is held
    }
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Prevent the fish from going off the top
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    // Prevent the fish from going off the bottom
    if (this.y > height - this.size) {
      this.y = height - this.size;
      this.velocity = 0;
    }
  }

  swimUp() {
    this.velocity = this.lift; // Apply the lift force
  }

  stopSwimming() {
    // Gradually slow the fish's upward movement when mouse is released
    this.velocity = max(this.velocity, 0);
  }

  display() {
    imageMode(CENTER); // Position the image at the center of the fish
    image(fishImage, this.x, this.y, this.size, this.size / 2); // Display fish image
  }

  // Adjusted collision detection method with smaller top and bottom hitboxes
  collidesWith(star) {
    let fishLeft = this.x - this.size / 2;
    let fishRight = this.x + this.size / 2;

    // Use a smaller top and bottom hitbox (for example, 1/3 of the size)
    let fishTop = this.y - this.size / 6; // Reduced height for top hitbox
    let fishBottom = this.y + this.size / 6; // Reduced height for bottom hitbox

    let starLeft = star.x - star.size / 2;
    let starRight = star.x + star.size / 2;
    let starTop = star.y - star.size / 2;
    let starBottom = star.y + star.size / 2;

    // Check if the bounding boxes of the fish and the star are overlapping
    return !(fishRight < starLeft || fishLeft > starRight || fishBottom < starTop || fishTop > starBottom);
  }
}


class Obstacle {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.size = random(80, 120); // Increased obstacle size
    this.hitboxSize = this.size * 0.5; // Shrink hitbox to 50% of the obstacle size (from the bottom)
    this.hitboxY = this.y - this.hitboxSize / 2; // Adjust the Y position of the hitbox to center it
    this.speed = 4; // Speed of obstacles moving to the left
  }

  update() {
    this.x -= this.speed;
    this.hitboxY = this.y - this.hitboxSize / 2; // Keep hitbox centered
  }

  display() {
    imageMode(CENTER); // Position the image at the center of the obstacle
    image(obstacleImage, this.x, this.y, this.size, this.size); // Display obstacle image

    // Draw the hitbox (for debugging purposes)
    //noFill();
    //stroke(255, 0, 0); // Red for the hitbox
    //rect(this.x - this.size / 2, this.hitboxY, this.size, this.hitboxSize);
  }

  isOffScreen() {
    return this.x + this.size < 0;
  }
}

class Obstacle2 {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.size = random(80, 120); // Increased obstacle size
    this.hitboxSize = this.size * 0.5; // Shrink hitbox to 50% of the obstacle size (from the bottom)
    this.hitboxY = this.y - this.hitboxSize / 2; // Adjust the Y position of the hitbox to center it
    this.speed = 4; // Speed of obstacles moving to the left
  }

  update() {
    this.x -= this.speed;
    this.hitboxY = this.y - this.hitboxSize / 2; // Keep hitbox centered
  }

  display() {
    imageMode(CENTER); // Position the image at the center of the obstacle
    image(obstacle2Image, this.x, this.y, this.size, this.size); // Display second obstacle image

    // Draw the hitbox (for debugging purposes)
    //noFill();
    //stroke(255, 0, 0); // Red for the hitbox
    //rect(this.x - this.size / 2, this.hitboxY, this.size, this.hitboxSize);
  }

  isOffScreen() {
    return this.x + this.size < 0;
  }
}


class Obstacle3 {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.size = random(80, 120); // Increased obstacle size
    this.hitboxSize = this.size * 0.6; // Shrink hitbox to 70% of the obstacle size
    this.speed = 4; // Speed of obstacles moving to the left
    this.direction = random() < 0.5 ? 1 : -1; // Random up or down movement
  }

  update() {
    this.x -= this.speed;
    this.y += this.direction; // Move up or down based on direction
    if (this.y < 0 || this.y > height - this.size) {
      this.direction *= -1; // Reverse direction if it hits top or bottom
    }
  }

  display() {
    imageMode(CENTER); // Position the image at the center of the obstacle
    image(obstacle3Image, this.x, this.y, this.size, this.size); // Display third obstacle image
  }

  isOffScreen() {
    return this.x + this.size < 0;
  }
}

class Star {
  constructor() {
    this.x = width;
    this.y = random(height);
    this.size = random(20, 50); // Size of the star (can be adjusted)
    this.speed = 4; // Speed of the stars moving to the left
  }

  update() {
    this.x -= this.speed;
  }

  display() {
    imageMode(CENTER); // Position the image at the center of the star's coordinates
    image(starImage, this.x, this.y, this.size, this.size); // Display star image
  }

  isOffScreen() {
    return this.x + this.size < 0;
  }

  // Use the fish's collidesWith method for direct hitbox collision detection
  collidesWith(fish) {
    // The fish's bounding box collision check happens in the Fish class now
    return fish.collidesWith(this);
  }
}

let flowers = [];
let numFlowers = 60;
let timeElapsed = 0;
let disappearIndex = 0;
let startTime;
let flowerColor;

function setup() {
  createCanvas(1300, 800); // Canvas size: 1000x600
  startTime = millis();
  flowerColor = color(255, 0, 0); // Initial color (red)

  let cols = 12; // 12 columns
  let rows = 5; // 5 rows
  let spacingX = 90; // Increased horizontal spacing by 10 pixels (now 90)
  let spacingY = 110; // Increased vertical spacing by 10 pixels (now 110)

  // Calculate total grid width and height
  let gridWidth = cols * spacingX;
  let gridHeight = rows * spacingY;
  
  // Calculate offsets to center the grid on the canvas
  let offsetX = (width - gridWidth) / 2; // Center horizontally
  let offsetY = (height - gridHeight) / 2; // Center vertically

  // Create flowers and place them in a grid
  for (let i = 0; i < numFlowers; i++) {
    let x = offsetX + (i % cols) * spacingX;
    let y = offsetY + floor(i / cols) * spacingY;
    flowers.push(new Flower(x, y, flowerColor));
  }
}

function draw() {
  background("#afd69b");

  let currentTime = millis();
  timeElapsed = floor((currentTime - startTime) / 60000); // Calculate minutes elapsed

  // Check if it's time for a flower to disappear
  if (timeElapsed > disappearIndex && disappearIndex < flowers.length) {
    flowers[disappearIndex].disappear();
    disappearIndex++;
  }

  // Draw all the remaining flowers
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display();
  }

  // If all flowers have disappeared, reset and change colors
  if (disappearIndex >= flowers.length) {
    resetFlowers();
  }
}

function resetFlowers() {
  disappearIndex = 0;
  flowers = [];
  
  // New random color for all flowers after 60 minutes
  flowerColor = color(random(255), random(255), random(255));

  let cols = 12; // 12 columns
  let rows = 5; // 5 rows
  let spacingX = 90; // Increased horizontal spacing by 10 pixels (now 90)
  let spacingY = 110; // Increased vertical spacing by 10 pixels (now 110)

  // Calculate total grid width and height
  let gridWidth = cols * spacingX;
  let gridHeight = rows * spacingY;
  
  // Calculate offsets to center the grid on the canvas
  let offsetX = (width - gridWidth) / 2; // Center horizontally
  let offsetY = (height - gridHeight) / 2; // Center vertically

  // Create new flowers with random colors
  for (let i = 0; i < numFlowers; i++) {
    let x = offsetX + (i % cols) * spacingX;
    let y = offsetY + floor(i / cols) * spacingY;
    flowers.push(new Flower(x, y, flowerColor));
  }

  startTime = millis(); // Reset the time
}

// Flower class definition
class Flower {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.visible = true;
  }

  display() {
    if (this.visible) {
      // Draw the petals of the flower (5 petals)
      fill(this.color);
      noStroke();
      for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i;
        let petalX = this.x + cos(angle) * 20;
        let petalY = this.y + sin(angle) * 20;
        ellipse(petalX, petalY, 30, 50); // Petal shape
      }
      
      // Draw the center of the flower
      fill(255, 200, 0); // Yellow center
      ellipse(this.x, this.y, 30, 30); // Center circle
    }
  }

  disappear() {
    this.visible = false;
  }
}

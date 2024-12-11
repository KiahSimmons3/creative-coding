// artist statement:
//This project is kind of abstract, but to me, the scenery reminds me a lot of the blue ridge mountains!
//its where my granparents live, and they have this house in the middle of nowhere!!
//I stay there a lot, and they have this gorgeous view of the side of this mountain during sunrise/sunset
//and it looks almost exactly like what i made for this project! I thought it would be fun to make simething important to me!
//kiah simmons 12/11/2024

function setup() {
  createCanvas(400, 400);
  noLoop();
  noStroke();
}

function draw() {
  background(135, 206, 235); // sky blue

  let colors = [
    color("#ffcbcb"),  // First color (#ffcbcb)
    color("#ffb5b5"),  // Second color (#ffb5b5)
    color("#407088"),  // Third color (#407088)
    color("#132743")   // Fourth color (#132743)
  ];

  let layerHeight = height / colors.length;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    
    beginShape();

    let treePositions = []; // Store tree positions for this layer
    
    for (let x = 0; x <= width; x++) {
      // Vary the noise function for each line to create different shapes
      let y = noise(x * 0.01, i * 2) * layerHeight + i * layerHeight;
      vertex(x, y);
      
      // Randomly decide to place a tree at this x position
      if (random(1) < 0.02) { // Adjust probability to control tree density
        treePositions.push({ x: x, y: y });
      }
    }

    vertex(width, height);
    vertex(0, height);
    endShape();

    // Draw trees for this layer
    for (let pos of treePositions) {
      drawTree(pos.x, pos.y, colors[i]);
    }
  }
}

function drawTree(x, y, treeColor) {
  // Draw trunk and trees in the same color
  fill(treeColor);

  // Randomly decide the height of the tree (1, 2, or 3 levels)
  let levels = floor(random(1, 4));

  // Draw triangular trees (pine tree) the circle ones looked a little ugly!
  for (let i = 0; i < levels; i++) {
    triangle(x - 10, y - i * 20, x + 10, y - i * 20, x, y - 30 - i * 20);
  }

  // Draw trunk
  rect(x - 2, y, 4, 20);
}
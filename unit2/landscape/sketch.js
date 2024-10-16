function setup() {
  createCanvas(400, 400);
  noLoop();
  noStroke();
}

function draw() {
  background(135, 206, 235); // sky blue

  let colors = [
    color("#ffcbcb" ),  // First color (#ffcbcb)
    color("#ffb5b5" ),  // Second color (#ffb5b5)
    color("#407088"),  // Third color (#407088)
    color("#132743")   // Fourth color (#132743)
  ];

  let layerHeight = height / colors.length;

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    
    beginShape();
    
    for (let x = 0; x <= width; x++) {
      // Vary the noise function for each line to create different shapes
      let y = noise(x * 0.01, i * 2) * layerHeight + i * layerHeight;
      vertex(x, y);
    }

    vertex(width, height);
    vertex(0, height);
    endShape();
  }
}

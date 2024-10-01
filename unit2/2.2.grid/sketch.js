function setup() {
  // create a canvas
  createCanvas(1200, 1200);

  // disable animation
  noLoop();
}

function draw() {
  background(255); //white bg
  translate(100,100);
for (let x = 0; x < 8; x++){
   for (let y = 0; y < 8; y++){ //makes the grid 8x8 
      push();
      translate(x * 105, y * 105); //105 pixels apart

      // random color and stroke
      let r = random(255); 
      let g = random(255);
      let b = random(255);
      fill(r, g, b);
      strokeWeight(4); 
      stroke(random(255), random(255), random(255));


      let size = random(50, 100);
      ellipse(0,0,100,100); //circle drawer
      pop();
     }
   }
}
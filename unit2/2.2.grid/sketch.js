function setup() {
  // create a canvas
  createCanvas(1200, 1200);

  // disable animation
  noLoop();
}

function draw() {
  background(255);
  translate(100,100);
for (let x = 0; x < 8; x++){
   for (let y = 0; y < 8; y++){
      push();
      translate(x * 100, y * 100);

      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b);
      strokeWeight(4); 
      stroke(random(255), random(255), random(255));


      let size = random(50, 100);
      ellipse(0,0,100,100);
      pop();
     }
   }
}
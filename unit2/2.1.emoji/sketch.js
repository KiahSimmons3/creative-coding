function setup() {
  // create a canvas
  createCanvas(400, 400);

  // disable animation
  noLoop();
}

function draw() {
  background(220);

  rectMode(CENTER);

//main emoji circle
  fill(225,220,100);
  stroke("#f5bc42");
  strokeWeight(8);
  circle(200,200,250);
//mouth
  fill("#ad7e51");
  stroke("#755a41");
  strokeWeight (3);
  circle(200,270, 85, 85);
//left eye
  fill("#ad7e51");
  stroke("#755a41");
  strokeWeight (3);
  ellipse(150,150, 50, 60);
//right eye
  fill("#ad7e51");
  stroke("#755a41");
  strokeWeight (3);
  ellipse(250,150, 50, 60);


}
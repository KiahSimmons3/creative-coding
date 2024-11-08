let eye1X = 200; // x-position of the first eyeball
let eye1Y = 200; // y-position of the first eyeball
let eye2X = 400; // x-position of the second eyeball
let eye2Y = 200; // y-position of the second eyeball
let eyeRadius = 50; // radius of the eyeballs

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#363030");
  
  // Draw both eyeballs
  drawEye(eye1X, eye1Y);
  drawEye(eye2X, eye2Y);
}

function drawEye(x, y) {
  let d = dist(x, y, mouseX, mouseY); // Distance from the center of the eye to the mouse
  let ang = atan2(mouseY - y, mouseX - x); // Angle from the center of the eye to the mouse

  // Draw the eyeball (white part)
  fill(255);
  noStroke();
  ellipse(x, y, eyeRadius * 2, eyeRadius * 2);
  
  // Draw the pupil (black part)
  fill(0);
  let pupilRadius = eyeRadius / 3; // Pupil is smaller than the eyeball
  let pupilX = x + cos(ang) * (eyeRadius / 2); // Position pupil along the angle
  let pupilY = y + sin(ang) * (eyeRadius / 2);
  ellipse(pupilX, pupilY, pupilRadius * 2, pupilRadius * 2); // Draw the pupil
}

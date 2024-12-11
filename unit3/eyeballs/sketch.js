let eyePositions = [
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  { x: 500, y: 100 },
  { x: 100, y: 300 },
  { x: 300, y: 300 },
  { x: 500, y: 300 },
  { x: 200, y: 200 },
  { x: 400, y: 200 }
];
let eyeRadius = 50; // radius of the eyeballs

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#363030");

  // Draw all eyeballs
  for (let pos of eyePositions) {
    drawEye(pos.x, pos.y);
  }
}

function drawEye(x, y) {
  let d = dist(x, y, mouseX, mouseY); // Distance from the center of the eye to the mouse
  let ang = atan2(mouseY - y, mouseX - x); // Angle from the center of the eye to the mouse

  // Draw the eyeball (red part)
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, eyeRadius * 2, eyeRadius * 2);

  // Draw the pupil (black part)
  fill(0);
  let pupilRadius = eyeRadius / 3; // Pupil is smaller than the eyeball
  let pupilX = x + cos(ang) * (eyeRadius / 2); // Position pupil along the angle
  let pupilY = y + sin(ang) * (eyeRadius / 2);
  ellipse(pupilX, pupilY, pupilRadius * 2, pupilRadius * 2); // Draw the pupil
}
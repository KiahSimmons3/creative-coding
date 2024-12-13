let eyePositions = [
  { x: 100, y: 100, isBlinking: false },
  { x: 300, y: 100, isBlinking: false },
  { x: 500, y: 100, isBlinking: false },
  { x: 100, y: 300, isBlinking: false },
  { x: 300, y: 300, isBlinking: false },
  { x: 500, y: 300, isBlinking: false },
  { x: 200, y: 200, isBlinking: false },
  { x: 400, y: 200, isBlinking: false }
];
let eyeRadius = 50; // Radius of the eyeballs

function setup() {
  createCanvas(600, 400);
  frameRate(30); // Set frame rate for smoother animations
}

function draw() {
  background("#363030");

  for (let eye of eyePositions) {
    // Check if mouse is hovering over the eye
    if (dist(mouseX, mouseY, eye.x, eye.y) < eyeRadius) {
      if (!eye.isBlinking) {
        eye.isBlinking = true; // Start blinking
        eye.blinkTimer = 10; // Blink duration in frames
      }
    }

    // Draw the eye considering its blink state
    drawEye(eye);
  }
}

function drawEye(eye) {
  if (eye.isBlinking) {
    // Draw a closed eye (a thin horizontal ellipse)
    fill(0);
    noStroke();
    ellipse(eye.x, eye.y, eyeRadius * 2, eyeRadius / 3);

    // Decrease the blink timer
    eye.blinkTimer--;
    if (eye.blinkTimer <= 0) {
      eye.isBlinking = false; // Stop blinking when the timer runs out
    }
  } else {
    let ang = atan2(mouseY - eye.y, mouseX - eye.x); // Angle from the center of the eye to the mouse

    // Draw the eyeball (red part)
    fill(255, 0, 0);
    noStroke();
    ellipse(eye.x, eye.y, eyeRadius * 2, eyeRadius * 2);

    // Draw the pupil (black part)
    fill(0);
    let pupilRadius = eyeRadius / 3; // Pupil is smaller than the eyeball
    let pupilX = eye.x + cos(ang) * (eyeRadius / 2); // Position pupil along the angle
    let pupilY = eye.y + sin(ang) * (eyeRadius / 2);
    ellipse(pupilX, pupilY, pupilRadius * 2, pupilRadius * 2); // Draw the pupil
  }
}

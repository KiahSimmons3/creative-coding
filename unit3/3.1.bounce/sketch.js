let circles = [];  // Array to hold multiple bouncing objects
let numCircles = 15;  // Number of bouncing objects

function setup() {
  createCanvas(400, 400);

  // Initialize each circle with random position, speed, and color
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      xspeed: random(1, 6),
      yspeed: random(1, 6), //both are a random speed 1-6
      color: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background("black"); // i made the background black because it looks cool

  // Loop through each circle and update its position
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];

    // collision with left/right edges
    if (c.x < 0 || c.x > width) {
      c.xspeed = c.xspeed * -1;
      c.color = color(random(255), random(255), random(255));  // Change color whgen it hits the side
    }

    // collision with top/bottom edges
    if (c.y < 0 || c.y > height) {
      c.yspeed = c.yspeed * -1;
      c.color = color(random(255), random(255), random(255));  // Change color whgen it hits the side
    }

    // Update position
    c.x = c.x + c.xspeed;
    c.y = c.y + c.yspeed;

    // Draw the circle with its specific color
    fill(c.color);
    noStroke();
    circle(c.x, c.y, 30); //size of circle
  }
}

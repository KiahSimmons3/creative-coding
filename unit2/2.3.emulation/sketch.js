//The piece i want to emulate is "Quadrate werden rot" (1966) by Frieder Nake found at: https://collections.vam.ac.uk/item/O1284908/quadrate-werden-rot-plotter-drawing-frieder-nake/?carousel-image=2014GY7592


function setup() {
  // create the canvas
  createCanvas(600, 800);

  // disable animation
  //noLoop();
  frameRate(1);
}

function draw() {
  background("#e1ddda");


translate(6,105);
//17 x 17 grid
for (let x = 0; x < 17; x++){
   for (let y = 0; y < 17; y++){ 
      push();
      translate(x * 33, y * 33); //px apart
      strokeWeight(2); 
      stroke("#b6d2cd"); //makes bg squares blue
      noFill()
      square(20,20,20); //square size
      pop();
     }
   }

   for (let i = 0; i < 300; i++) { // Number of random squares
    let randomX = random(80, 485);  // Random X position in grid
    let randomY = random(50, 430); // Random Y position in grid
    let randomSize = random(20, 20);  // size for the new squares
    let colors = ["#b4453c", "#92608e", "#b48a5f"]; //3 random colors, pink yellow and purple
    let chosenColor = random(colors);

    push();
    translate(randomX, randomY);
    strokeWeight(2);
    stroke(chosenColor);
    noFill()
    square(0, 0, randomSize);  // Random squares
    pop();
  }
}
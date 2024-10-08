function setup() {
  // create a canvas
  createCanvas(1200, 1200);

  // disable animation
  //noLoop();
  frameRate(1);
}

function draw() {
  background("#2e2c2c"); //white bg
  translate(100,100);
for (let x = 0; x < 9; x+=1.2){
   for (let y = 0; y < 9; y+=1.2){ //makes the grid 8x8 
      push();
      translate(x * 105, y * 105); //105 pixels apart

      // random color and stroke

      let colors = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC300", "#bdf6f3"];
      let chosenColor = random(colors);
      let colors2 = ["#581845", "#900C3F", "#C70039", "#FF5733", "#FFC300", "#bdf6f3"];
      let chosenColor2 = random(colors2);
     
      fill(chosenColor);
      strokeWeight(6); 
      stroke(chosenColor2);


      let size = random(50, 100);
      rect(0,0,100,100); //circle drawer
      pop();
     }
   }
}
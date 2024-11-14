//This page reimplements Alison Knowles and James Tenney's "House of Dust," using Tracery grammar, the code generates variations on the poem's structure, inspired by the original's generative nature. The structure has been adapted to use a random, procedural approach, producing unique quatrains each time.
//I didn't change much, i just changed all of the words to make it a mix of more whimsical and a bit sinister at the same time, because i liked the nature of the sentence fragment poems we worked on in the previous exercise!
//I also made the colors more fun and interesting!


let grammar;
let quatrains = [];
let timer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(16);
  textFont('monospace');
  fill(255); // Set text color to white
  noStroke();

  // Initialize the grammar
  grammar = tracery.createGrammar({
    "origin": "A HOUSE OF #material#\n#place#\nUSING #light_source#\nINHABITED BY #inhabitants#",
    "material": ["ocean", "sand", "vines", "birds", "love", "tears", "glass", "thorns", "glass", "candles", "wax", "bone", "sea salt", "knives", "straw", "weeds"],
    "place": ["At the bottom of the ocean", "Secluded from life itself", "By the sea", "In an abandoned building", "Inside someone's heart", "In a distant world", "In an abandoned house", "At UMW", "Along the shore", "Among the weeds", "In the dark", "In a place untouched by the sun", "Covered with birds", "In a cold dark desert", "Among the ribs and bones", "Beneath the heart", "In a place full of love", "On the sea", "In a world where sickness is gone", "Underwater"],
    "light_source": ["candles", "lightbulbs", "glowing crystals", "a magic circle", "glowworms", "fireflies", "pixies", "magic fire"],
    "inhabitants": ["little moles having a tea party", "little bugs", "birds", "saddened souls", "all species of fish", "butterflies", "various birds and fish", "lovers", "enemies", "a giant shark", "vampires", "a group of friends", "sleepy dogs", "a lonely hermit", "a slow beating heart", "a comically large fish", "a girl, knitting a scarf", "millions of flowers", "glowing mushrooms"]
  });
}

function draw() {
  // Create a black-to-light-red gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let r = lerp(0, 255, inter);
    let g = lerp(0, 50, inter);
    let b = lerp(0, 50, inter);
    stroke(r, g, b);
    line(0, y, width, y);
  }

  // Generate a new quatrain every 120 frames (roughly 2 seconds)
  if (frameCount % 120 === 0) {
    let newQuatrain = grammar.flatten("#origin#");
    quatrains.push(newQuatrain);
  }

  // Display all generated quatrains on screen
  let y = 50;
  for (let i = 0; i < quatrains.length; i++) {
    text(quatrains[i], 20, y);
    y += 100;
  }

  // Remove the oldest quatrain if the text overflows the canvas height
  if (y > height) {
    quatrains.shift();
  }
}

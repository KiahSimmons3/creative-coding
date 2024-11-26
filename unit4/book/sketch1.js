// Grammar and Template Setup
const rules = {
  place: ["a forgotten forest", "the kingdom of shadows", "a distant desert"],
  protagonist: ["a wandering knight", "a clever thief", "a curious scholar"],
  goal: ["eternal glory", "the lost artifact", "forbidden knowledge"],
  challenges: ["monstrous foes", "treacherous terrain", "deceitful allies"],
  helper: ["a wise sage", "a loyal beast", "a mysterious stranger"],
  obstacle: ["their greatest fear", "a deadly trap", "an ancient curse"],
  revelation: ["a hidden truth", "their true purpose", "the power within"],
};

// Template for the myth
const mythTemplate = `
Long ago, in the land of #place#, there lived a #protagonist# who sought #goal#. 
To achieve this, they faced #challenges#. With the help of #helper#, they overcame #obstacle# 
and discovered #revelation#. But all was not as it seemed...
`;

// Utility Function: Replace placeholders with random words
function generateStory(template) {
  return template
    .replace("#place#", randomChoice(rules.place))
    .replace("#protagonist#", randomChoice(rules.protagonist))
    .replace("#goal#", randomChoice(rules.goal))
    .replace("#challenges#", randomChoice(rules.challenges))
    .replace("#helper#", randomChoice(rules.helper))
    .replace("#obstacle#", randomChoice(rules.obstacle))
    .replace("#revelation#", randomChoice(rules.revelation));
}

// Utility: Pick a random element from an array
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate the full book content
function generateBook(wordGoal = 50000) {
  let content = "";
  let wordCount = 0;
  let chapter = 1;

  while (wordCount < wordGoal) {
    const story = generateStory(mythTemplate);
    content += `\n\nChapter ${chapter}\n\n${story}`;
    wordCount += story.split(" ").length; // Count words
    chapter++;
  }

  return content;
}

// p5.js Setup: Create the page layout
function setup() {
  noCanvas(); // No canvas needed; everything is on the webpage

  // Generate the book content
  const bookContent = generateBook(50000);

  // Create a container for the text
  const container = createDiv();
  container.style("font-family", "Georgia, serif");
  container.style("padding", "20px");
  container.style("max-width", "800px");
  container.style("margin", "auto");
  container.style("line-height", "1.6");
  container.style("white-space", "pre-wrap");

  // Add the title
  const title = createElement("h1", "The Fragmented Myth");
  title.style("text-align", "center");
  title.style("font-size", "2em");
  title.style("margin-bottom", "20px");
  container.child(title);

  // Add the book content
  const content = createP(bookContent);
  content.style("text-align", "justify");
  container.child(content);
}

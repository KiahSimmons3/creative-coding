let sentence1 = "This is a book"; // Sentence variation 1
let sentence2 = "Is this a book?"; // Sentence variation 2
let wc = 0;

function setup() {
  // We won't need any canvas
  noCanvas();

  let content = select("body");
  content.attribute("id", "content");

  content.style("background-color", "#8B0000"); // Dark red background
  content.style("color", "#8B0000"); // White text

  content.child(createElement("h1", "Book of Sentences"));

  // Make a sentence
  while (wc < 50000) {
    content.child(createElement("h2", String(generateSentence() + " ").repeat(random(2, 6)).toUpperCase()));

    for (let p = 0; p < random(5, 20); p++) {
      let paragraph = '';
      for (let s = 0; s < random(3, 20); s++) {
        let internalPunct = [",", ",", ",", ";", " --"];
        let endPunct = [".", ".", "?", "!"];
        let sentenceToRepeat = generateSentence().charAt(0).toUpperCase() + generateSentence().slice(1); // Capitalize first letter of the sentence
        let sentenceLength = random(9, 25); // Randomize the sentence length
        wc += sentenceLength + 1;

        // Repeat the sentence and add punctuation
        for (let w = 0; w < sentenceLength; w++) {
          sentenceToRepeat += " " + generateSentence();
          if (random() < 0.2) {
            sentenceToRepeat += random(internalPunct); // Add internal punctuation
          }
        }
        sentenceToRepeat += random(endPunct) + " "; // Add end punctuation
        paragraph += sentenceToRepeat; // Add the sentence to the paragraph
      }
      content.child(createElement("p", paragraph)); // Add the paragraph to the content
    }
  }

  window.PagedPolyfill.preview();
}

// Function to generate sentence with "and" between sentence1 and sentence2
function generateSentence() {
  return sentence1 + " and " + sentence2;
}

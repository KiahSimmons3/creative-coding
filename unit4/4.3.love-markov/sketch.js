let rm; // Declare the Markov model
let letter; // Declare the letter element

function setup() {
    noCanvas(); // We won't use a canvas for this project

    // Initialize the Markov model with an order of 2
    rm = RiTa.markov(2);

    // Load the text data from the #source div
    let data = document.getElementById("source").innerText.trim();
    if (data.length === 0) {
        console.error("Source text is empty. Please add text to the #source div in index.html.");
        return;
    }

    // Train the Markov model
    rm.addText(data);

    // Generate the initial letter
    generateLetter();
}

function generateLetter() {
    // Generate 6 lines of text
    let lines = rm.generate(6);

    // Find the #letter element
    letter = select("#letter");
    letter.html(""); // Clear any existing content in #letter

    // Add a salutation
    letter.child(createP("My Dearest Harrington,"));

    // Add the generated lines as paragraphs
    for (let l = 0; l < lines.length; l++) {
        let paragraph = createP(lines[l]);
        letter.child(paragraph);
    }

    // Add a closing
    letter.child(createP("Sincerely,<br>Markov"));
}

function mousePressed() {
    if (!letter) return;

    // Clear the existing letter
    letter.html("");

    // Generate a new letter
    generateLetter();
}

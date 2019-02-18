// Chosen font
const letters = require('./letters.js');

// Inputs
const phrase = process.argv[2];
const letterSpacing = Number(process.argv[3]) || 1;

// Preamble
console.log(`Phrase: "${phrase}"`);
console.log(`Letter spacing: ${letterSpacing}`);

// Create generic spacing
const letterSpacingStr = String("").padEnd(letterSpacing, " ");

// Properties
const lines = [];
const warnings = [];

// Create letters
[...phrase].forEach((letter) => {
   
    // Get letter
    // Uses special character to fill in for missing characters
    const bigLetter = letters[letter] || letters['_missing'];

    // Append letter to line
    bigLetter.split("\n").forEach((letterStr, line) => {
        
        // Skip any broken characters
        if (letterStr.length === 0) {
            return;
        }
        
        // Append letter chars to line chars
        lines[line] = (lines[line] || "") + String(letterStr + letterSpacingStr);

        // Verify letter sanity
        if (letters._width && letterStr.length !== letters._width) {
            warnings.push(`WARN: "${letter}" has a width of ${letterStr.length} on line ${line}. Expected ${letters._width}`);
        }
    });
});

// Show output
console.log(lines.join("\n"));

// Show warnings
warnings.forEach(warn => console.warn(warn));

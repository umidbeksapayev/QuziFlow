const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\7cc28a67-9fda-4258-9531-22b0669a1e8a\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

let userRequestText = '';
for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    if ((data.source === 'USER_EXPLICIT' || data.type === 'USER_INPUT') && data.content && data.content.includes('51. Terrasa nima?')) {
      userRequestText = data.content;
      break;
    }
  } catch (err) {}
}

if (!userRequestText) {
  console.error('Could not find the user request containing 51. Terrasa nima?');
  process.exit(1);
}

// Clean up HTML entities like &quot; or &lsquo; or &rsquo;
let text = userRequestText
  .replace(/&quot;/g, '"')
  .replace(/&ldquo;/g, '"')
  .replace(/&rdquo;/g, '"')
  .replace(/&lsquo;/g, "'")
  .replace(/&rsquo;/g, "'")
  .replace(/&ldquo;/g, '"')
  .replace(/&rdquo;/g, '"')
  .replace(/o‘/g, "o'")
  .replace(/o'/g, "o‘")
  .replace(/g‘/g, "g'")
  .replace(/g'/g, "g‘")
  .replace(/t‘/g, "t'")
  .replace(/t'/g, "t‘");

// Parse questions using regex
// A question starts with a number, e.g. "51. Terrasa nima?"
// Followed by "Javob: ..."
// Let's split or find all matches
const flashcards = [];

// Let's use a regex that matches:
// Number followed by dot, then the question text, then "Javob:" and then the answer text.
// We can use a parser loop.
const linesOfRequest = text.split('\n');
let currentNum = null;
let currentQuestion = '';
let currentAnswer = '';
let isParsingAnswer = false;

for (let line of linesOfRequest) {
  line = line.trim();
  if (!line) continue;

  const qMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (qMatch) {
    // If we were parsing a previous question, save it
    if (currentNum !== null && currentQuestion && currentAnswer) {
      flashcards.push({
        number: parseInt(currentNum),
        question: currentQuestion.trim(),
        answer: currentAnswer.trim()
      });
    }
    currentNum = qMatch[1];
    currentQuestion = qMatch[2];
    currentAnswer = '';
    isParsingAnswer = false;
    continue;
  }

  if (line.startsWith('Javob:')) {
    isParsingAnswer = true;
    currentAnswer = line.substring(6).trim();
    continue;
  }

  // If we are parsing, append to question or answer
  if (currentNum !== null) {
    if (isParsingAnswer) {
      currentAnswer += ' ' + line;
    } else {
      currentQuestion += ' ' + line;
    }
  }
}

// Push last card
if (currentNum !== null && currentQuestion && currentAnswer) {
  flashcards.push({
    number: parseInt(currentNum),
    question: currentQuestion.trim(),
    answer: currentAnswer.trim()
  });
}

console.log(`Parsed ${flashcards.length} flashcards!`);
console.log('First card:', flashcards[0]);
console.log('Last card:', flashcards[flashcards.length - 1]);

fs.writeFileSync('parsed_new_flashcards.json', JSON.stringify(flashcards, null, 2), 'utf8');

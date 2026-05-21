const fs = require('fs');

function parseQuestionsFromFile(filename) {
  const text = fs.readFileSync(filename, 'utf8')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/o‘/g, "o'")
    .replace(/o'/g, "o‘")
    .replace(/g‘/g, "g'")
    .replace(/g'/g, "g‘")
    .replace(/t‘/g, "t'")
    .replace(/t'/g, "t‘");

  const lines = text.split('\n');
  const flashcards = [];
  let currentNum = null;
  let currentQuestion = '';
  let currentAnswer = '';
  let isParsingAnswer = false;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const qMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (qMatch) {
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

    if (currentNum !== null) {
      if (isParsingAnswer) {
        currentAnswer += ' ' + line;
      } else {
        currentQuestion += ' ' + line;
      }
    }
  }

  if (currentNum !== null && currentQuestion && currentAnswer) {
    flashcards.push({
      number: parseInt(currentNum),
      question: currentQuestion.trim(),
      answer: currentAnswer.trim()
    });
  }

  return flashcards;
}

const cards1to50 = parseQuestionsFromFile('extracted_user_request_1_50.txt');
const cards51to194 = parseQuestionsFromFile('extracted_user_request.txt');

console.log(`Parsed ${cards1to50.length} cards from 1-50 file.`);
console.log('Numbers in 1-50 file:', cards1to50.map(c => c.number));
console.log(`Parsed ${cards51to194.length} cards from 51-194 file.`);
console.log('Numbers in 51-194 file:', cards51to194.map(c => c.number));

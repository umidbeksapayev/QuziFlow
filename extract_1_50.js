const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\7cc28a67-9fda-4258-9531-22b0669a1e8a\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    // The previous request had 1-40 or 1-50 questions. Let's search for "1. Ko‘chmas mulk obyektlarining davlat kadastri"
    if (data.content && data.content.includes('1. Ko‘chmas mulk obyektlarining davlat kadastri')) {
      console.log('Found user request with 1-50!');
      fs.writeFileSync('extracted_user_request_1_50.txt', data.content, 'utf8');
      break;
    }
  } catch (err) {}
}

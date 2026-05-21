const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\7cc28a67-9fda-4258-9531-22b0669a1e8a\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const data = JSON.parse(line);
    if (data.source === 'USER_EXPLICIT' && data.content && data.content.includes('51. Terrasa nima?')) {
      console.log('Found user request in USER_EXPLICIT!');
      fs.writeFileSync('extracted_user_request.txt', data.content, 'utf8');
      break;
    }
    if (data.type === 'USER_INPUT' && data.content && data.content.includes('51. Terrasa nima?')) {
      console.log('Found user request in USER_INPUT!');
      fs.writeFileSync('extracted_user_request.txt', data.content, 'utf8');
      break;
    }
  } catch (err) {
    // Ignore JSON parsing errors
  }
}


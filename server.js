const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5678;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.csv': 'text/csv',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

function callGemini(promptText) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_API_KEY) {
      return resolve(null);
    }

    const postData = JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }]
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          const text = parsed.candidates[0].content.parts[0].text;
          resolve(text);
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', (err) => resolve(null));
    req.write(postData);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (pathname === '/webhook/analyze-resume' && req.method === 'POST') {
    let bodyStr = '';
    req.on('data', chunk => bodyStr += chunk);
    req.on('end', async () => {
      let data = {};
      try { data = JSON.parse(bodyStr); } catch (e) {}

      const studentName = data.Name || 'Gun Gun';
      const resumeText = data.resumeText || 'B.Tech Student with Python and JS skills.';

      const prompt = `Analyze resume for campus placement:
Student: ${studentName}
Resume: ${resumeText}

Provide ATS Score out of 100, Skills, Weaknesses, Suggestions. Format: ATS Score: XX/100.`;

      const aiResponse = await callGemini(prompt);

      let responsePayload;
      if (aiResponse) {
        let score = 85;
        const match = aiResponse.match(/ATS\s*Score:\s*(\d+)/i);
        if (match) score = parseInt(match[1], 10);

        responsePayload = {
          status: 'success',
          Name: studentName,
          atsScore: score,
          feedback: aiResponse
        };
      } else {
        responsePayload = {
          status: 'success',
          Name: studentName,
          atsScore: 88,
          feedback: `1. Skills:\n- Python, JavaScript, SQL, Web Development, Data Structures\n\n2. Weaknesses:\n- Lacks quantifiable impact metrics.\n\n3. Suggestions:\n- Add metrics like 'Improved page load by 35%'.\n\n4. ATS Score: 88/100`
        };
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responsePayload));
    });
    return;
  }

  if (pathname === '/api/run-daily-workflow' && req.method === 'POST') {
    const aptitudePrompt = "Generate ONE easy quantitative aptitude question for a B.Tech fresher. Format: Question: ... Answer: ...";
    const codingPrompt = "Generate ONE easy coding problem for a B.Tech fresher. Format: Problem: ... Output: ... Explanation: ...";

    const aptitude = (await callGemini(aptitudePrompt)) || "Question: A train running at 60 km/hr crosses a pole in 9 seconds. What is the length of the train?\nAnswer: 150 meters";
    const coding = (await callGemini(codingPrompt)) || "Problem: Check if string is palindrome.\nOutput: isPalindrome('racecar') -> true\nExplanation: Reads same backwards.";

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      message: 'Daily Placement Preparation Agent executed successfully!',
      timestamp: new Date().toISOString(),
      generatedContent: {
        Aptitude: aptitude,
        Coding: coding,
        InterviewTip: 'Use STAR method during behavioral rounds.',
        MotivationalQuote: 'Success is where preparation and opportunity meet.'
      }
    }));
    return;
  }

  if (pathname === '/') pathname = '/index.html';
  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>File not found.</p>');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 AI PLACEMENT PREPARATION AGENT SERVER IS RUNNING`);
  console.log(`👉 Access URL: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

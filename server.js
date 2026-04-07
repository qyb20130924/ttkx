const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data file paths
const QUOTES_PATH = path.join(__dirname, 'data', 'quotes.json');
const JOKES_PATH = path.join(__dirname, 'data', 'jokes.json');
const MOMENTS_PATH = path.join(__dirname, 'data', 'moments.json');

// Helper function to read JSON file
const readJsonFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write JSON file
const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// Get random happy quote
app.get('/api/quote', (req, res) => {
  try {
    const quotes = readJsonFile(QUOTES_PATH);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ success: true, data: randomQuote });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get quote' });
  }
});

// Get random joke
app.get('/api/joke', (req, res) => {
  try {
    const jokes = readJsonFile(JOKES_PATH);
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json({ success: true, data: randomJoke });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get joke' });
  }
});

// Get all happy moments
app.get('/api/moments', (req, res) => {
  try {
    const moments = readJsonFile(MOMENTS_PATH);
    // Return reversed to show latest first
    res.json({ success: true, data: moments.reverse() });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get moments' });
  }
});

// Add new happy moment
app.post('/api/moments', (req, res) => {
  try {
    const { content } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ success: false, message: 'Content cannot be empty' });
    }

    const moments = readJsonFile(MOMENTS_PATH);
    const newMoment = {
      id: Date.now(),
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN')
    };

    moments.push(newMoment);
    writeJsonFile(MOMENTS_PATH, moments);

    res.json({ success: true, data: newMoment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save moment' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Happy Everyday server is running on http://localhost:${PORT}`);
  console.log('Open your browser and visit the link to start your happy day!');
});

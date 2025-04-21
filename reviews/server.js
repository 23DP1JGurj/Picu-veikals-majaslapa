const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
const DATA_FILE = path.join(__dirname, 'reviews.json');

function readReviews() {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeReviews(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/reviews', (req, res) => {
  res.json(readReviews());
});

app.post('/api/reviews', (req, res) => {
  const reviews = readReviews();
  reviews.push({ text: req.body.text, date: new Date().toISOString() });
  writeReviews(reviews);
  res.status(201).json({ success: true });
});

app.use(express.static(path.join(__dirname, '..', 'src')));
app.use(express.static(path.join(__dirname, '..')));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
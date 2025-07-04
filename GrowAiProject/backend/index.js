const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://headlinegen.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover the Magic of {name} in {location}",
  "{name} – Redefining Local Excellence in {location}",
  "The Buzz About {name} in {location} You Shouldn't Miss!",
  "2025's Best Kept Secret: {name} in {location}"
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  const headline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({
    ratings: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 100),
    headline
  });
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  const headline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({ headline });
});

app.listen(PORT, () => console.log(`Server is RUNNING on port ${PORT}`));

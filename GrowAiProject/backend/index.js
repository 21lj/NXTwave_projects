const express = require('express');
const cors = require('cors');
const app = express();

// 1. Nuclear CORS settings
app.use(cors({
  origin: true, // Dynamically allow requesting origin
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// 2. Explicit preflight handler
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
});

// 3. Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
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

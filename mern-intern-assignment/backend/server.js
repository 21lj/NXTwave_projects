const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
db.init()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/users', require('./routes/users'));
app.use('/api/students', require('./routes/students'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
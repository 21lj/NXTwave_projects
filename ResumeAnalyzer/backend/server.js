const express = require('express');
const cors = require('cors');
const path = require('path')
require('dotenv').config(); 
const resumeRoutes = require('./routes/resumeRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json())

const buildPath = path.join(__dirname, '../frontend/build')
console.log("Configured build path for static files:", buildPath)
app.use(express.static(buildPath))

app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Resume Analyzer Backend Server is Running!');
});

app.listen(PORT, '0.0.0.0',() => {
    console.log(`\n Resume Analyzer Backend Server is running on http://0.0.0.0:${PORT}`)
});
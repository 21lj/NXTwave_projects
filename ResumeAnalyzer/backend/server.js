const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const resumeRoutes = require('./routes/resumeRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors());
app.use(express.json());

app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Resume Analyzer Backend Server is Running!');
});

app.listen(PORT, () => {
    console.log(`\n Resume Analyzer Backend Server is running on http://localhost:${PORT}`)
});
const express = require('express')
const cors = require('cors')

const app=express()
// app.use(cors())

app.use(cors({
  origin: '*', 
}));

app.use(express.json())

const PORT = 3001

const headlines = [
  "Why {name} is {location}'s Top Choice in 2025",
  "Discover the Magic of {name} in {location}",
  "{name} – Redefining Local Excellence in {location}",
  "The Buzz About {name} in {location} You Shouldn't Miss!",
  "2025's Best Kept Secret: {name} in {location}"
];

app.post('/business-data', (req, res) => {
    const {name, location}=req.body;
    const headline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('{name}', name)
    .replace('{location}', location)

    res.json({
        ratings: (Math.random()*1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random()*100),
        headline
    })

});

app.get('/regenerate-headline', (req, res)=> {
    const {name, location} = req.query
    const headline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('{name}', name)
    .replace('{location}', location)

    res.json({headline})

});

app.listen(PORT, ()=> console.log("Server is RUNNING!!"))
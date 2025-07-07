const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")
require('dotenv').config()

const app = express()

// app.use(cors())
app.use(cors({ origin: "*" }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.get('/', (req, res) => {
    res.send("E-Com API is Running")
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MONGOdb Connected")
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is Running on ${process.env.PORT}`)
        })
    }).catch((er) => {
        console.error(`Connection ERROR: ${er}`)
    })

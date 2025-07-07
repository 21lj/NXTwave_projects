const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const generateToken = user => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );
};

router.post("/register", async (req, res) => {
    const {name, email, password, role} = req.body;

    try{
        const existing = await User.findOne({email})

        if(existing)
            return res.status(400).json({error: "Email exists"});

        const user = await User.create({
            name, email, password, role
        })
        const token = generateToken(user)

        res.status(201).json({
            user: {
                name: user.name,
                role: user.role
            },
            token
        });

    }catch(er){
        res.status(500).json({
            error: er.message
        })
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user || !(await user.matchPassword(password)))
            return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user)
        res.json({
            user: {
                name: user.name,
                role: user.role
            },
            token
        });
    }catch(er){
        res.status(500).json({
            errorr: er.message
        })
    }
});

module.exports = router;
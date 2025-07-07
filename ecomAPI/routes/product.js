const express = require("express");
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/auth");
const router = express.Router();

// admin
router.post("/", protect, isAdmin, async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }catch(er){
        res.status(400).json({
            error: er.message
        })
    }
});

router.put("/:id", protect, isAdmin, async (req, res) => {
    try{
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body,{new: true})
        res.json(updated)
    }catch(er){
        res.status(400).json({
            error: er.message
        })
    }
});

router.delete("/:id", protect, isAdmin, async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.json({
            message: "Product deleted"
        })
    }catch(er){
        res.status(400).json({
            error: er.message
        })
    }
});

// public

router.get("/", async (req, res) => {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};

    if(search)
        query.name = {$regex: search, $options: "i"};

    if(category)
        query.category = category;

    const products = await Product.find(query)
                        .skip((page-1)*limit)
                        .limit(parseInt(limit));

    res.json(products)
});

router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                error: "Not Found"
            });
        }
        res.json(product)
    }catch(er){
        res.status(400).json({
            error: er.message
        })
    }
});

module.exports = router
const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.get("/", protect, async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user.id 
    }).populate("items.product");
    res.json(cart || {items: []})
});

router.post("/", protect, async (req, res) => {
    const {productId, quantity} = req.body 

    if(!productId){
        return res.status(400).json({
            error: "Product required"
        });
    }

    let cart = await Cart.findOne({
        user: req.user.id 
    })

    if(!cart)
        cart = await Cart.create({user: req.user.id, items: []})

    const existing = cart.items.find(i => i.product.toString() === productId)

    if(existing)
        existing.quantity += 1;
    else{
        cart.items.push({
            product: productId, 
            quantity: quantity || 1
        });
    }

    await cart.save();
    res.status(200).json(cart)
});


router.put("/:productId", protect, async (req, res) => {
    const {quantity} = req.body 
    const cart = await Cart.findOne({user: req.user.id})

    const item = cart.items.find(i => i.product.toString() === req.params.productId)

    if(item){
        item.quantity = quantity
        await cart.save()
    }

    res.json(cart)
});

router.delete("/:productId", protect, async (req, res) => {
    const cart = await Cart.findOne({user: req.user.id})
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart)
});

module.exports = router;
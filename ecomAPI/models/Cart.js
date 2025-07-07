const mongoose = require("mongoose")

const cartItemModel = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}

const cartItemSchema = new mongoose.Schema(cartItemModel)

const cartModel = {
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        unique: true
    },
    items: [cartItemSchema]
}

const cartSchema = new mongoose.Schema(cartModel)

module.exports = mongoose.model("Cart", cartSchema);
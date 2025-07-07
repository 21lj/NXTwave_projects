const mongoose = require("mongoose")

const productModel = {
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String 
}

const productSchema = new mongoose.Schema(productModel, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);
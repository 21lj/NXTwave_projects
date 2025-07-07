const mongoose = require("mongoose");

const OrderItemModel = {
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product"
 },
  name: String,
  price: Number,
  quantity: Number
}

const OrderItemSchema = new mongoose.Schema(OrderItemModel);

const orderModel = {
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    items: [OrderItemSchema],
    totalAmount: Number,
    createdAt: { type: Date, default: Date.now }
  }

const OrderSchema = new mongoose.Schema(
  orderModel,
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

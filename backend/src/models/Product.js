const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["mobile", "earphone", "fridge", "tv","watch","camera","mouse","printer"],
      message: "Category must be one of: mobile, earphone, fridge, tv,watch,camera,mouse,printer",
    },
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

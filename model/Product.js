const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product_type",
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_availability: {
      type: Boolean,
      default: true,
    },
    product_buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      default: null,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;

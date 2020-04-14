const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product_type = mongoose.model("product_types", productTypeSchema);

module.exports = Product_type;

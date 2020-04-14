const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: String,
    cellphone: Number,
    product_bought: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Customer = mongoose.model("customers", customerSchema);

module.exports = Customer;

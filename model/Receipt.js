const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    product_bought: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        product_name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Receipt = mongoose.model("receipt", receiptSchema);

module.exports = Receipt;

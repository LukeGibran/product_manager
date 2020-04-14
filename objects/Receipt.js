const Receipt = require("../model/Receipt");

module.exports = {
  /*** Create a receipt ***/
  createReceipt: async function (receiptObject) {
    try {
      const receipt = new Receipt(receiptObject);
      await receipt.save();

      return receipt;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** Get all Receipt ***/
  getAllReceipt: async function () {
    try {
      const receipt = await Receipt.find({});

      return receipt;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Get a Receipt ***/
  getAReceipt: async function (_id) {
    try {
      const receipt = await Receipt.findOne({ _id });
      if (!receipt) throw new Error("No receipt found");

      return receipt;
    } catch (err) {
      throw new Error(err);
    }
  },
};

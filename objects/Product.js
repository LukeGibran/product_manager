const Product = require("../model/Product");

module.exports = {
  /*** Create a Product ***/
  createProduct: async function (productObject) {
    try {
      const product = new Product(productObject);

      await product.save();

      return product;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** Get all Products ***/
  getAllProducts: async function () {
    try {
      const products = await Product.find({});

      return products;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Get a Product ***/
  getProduct: async function (_id) {
    try {
      const product = await Product.findOne({ _id });
      if (!product) throw new Error("No product found");
      return product;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Update a Product ***/
  updateProduct: async function (_id, updateObject) {
    const updates = Object.keys(updateObject);

    try {
      const product = await Product.findOne({ _id });
      if (!product) throw new Error("Product does not existk");

      updates.forEach((update) => (product[update] = updateObject[update]));
      await product.save();
      return product;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Remove a Product ***/
  deleteProduct: async function (_id) {
    try {
      const product = await Product.findOneAndDelete({ _id });
      return product;
    } catch (err) {
      throw new Error(err);
    }
  },
};

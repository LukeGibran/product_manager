const ProductType = require("../model/Product_type");

module.exports = {
  // Store the Products for reference
  productTypes: null,
  // Check if productTypes is null
  checkProductType: async function () {
    if (this.productTypes === null) {
      await this.getAllProductTypes();
      console.log("fetch in the database");
    }
  },

  /*** Get All Products ***/
  getAllProductTypes: async function () {
    try {
      const productTypes = await ProductType.find({});
      this.productTypes = productTypes;
      return productTypes;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Create a Product ***/
  createProductType: async function (type) {
    // Check if this is an existing types
    await this.checkProductType();

    try {
      // Returns False if type is already exist
      const isUnique = this.productTypes.every(
        (productType) => productType.type.toLowerCase() !== type.toLowerCase()
      );
      if (isUnique === false) {
        throw new Error("Duplicate Types");
      }

      const productType = new ProductType({
        type: type.toLowerCase(),
      });

      await productType.save();
      // Add the new Type to existing array
      this.productTypes.push(productType);

      return productType;
    } catch (err) {
      throw new Error(err);
    }
  },

  /*** Remove a Product Type ***/
  removeProductType: async function (id) {
    // Check if this is an existing types
    await this.checkProductType();

    try {
      const productType = await ProductType.findOneAndDelete({
        _id: id,
      });

      if (!productType) {
        throw new Error("Product Type not found!");
      }

      this.productTypes = this.productTypes.filter(
        (productType) => productType.id !== id
      );
      console.log(this.producTypes);
      return productType;
    } catch (err) {
      throw new Error(err);
    }
  },
};

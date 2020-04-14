const Customer = require("../model/Customer");

module.exports = {
  /*** Create a Customer ***/
  createCustomer: async function (customerObject) {
    try {
      const customer = new Customer(customerObject);
      await customer.save();

      return customer;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** Get All Customer ***/
  getAllCustomer: async function () {
    try {
      const customers = await Customer.find({});

      return customers;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** Get a Customer ***/
  getCustomer: async function (_id) {
    try {
      const customer = await Customer.findOne({ _id });

      if (!customer) throw new Error("No customer found!");
      return customer;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** update a Customer ***/
  updateCustomer: async function (_id, updateObject) {
    const updates = Object.keys(updateObject);

    try {
      const customer = await Customer.findOne({ _id });
      if (!customer) throw new Error("No customer found");
      updates.forEach((update) => (customer[update] = updateObject[update]));
      await customer.save();
      return customer;
    } catch (err) {
      throw new Error(err);
    }
  },
  /*** Add Bought Product ***/
  updateBought: async function (_id, product) {
    try {
      const customer = await Customer.findOne({ _id });
      if (!customer) throw new Error("No customer found");
      customer.product_bought = [...customer.product_bought, product];
      await customer.save();
      return customer;
    } catch (err) {
      throw new Error(err);
    }
  },
};

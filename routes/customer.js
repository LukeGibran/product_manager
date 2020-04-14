const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const Customer = require("../objects/Customer");

// Create a customer
router.post(
  "/",
  [auth, [check("name", "Please add the customer's name").not().isEmpty()]],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const data = await Customer.createCustomer(req.body);

      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Get All Customer
router.get("/", auth, async (req, res) => {
  try {
    const data = await Customer.getAllCustomer();

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error in fetching data" });
  }
});

// Get a Customer
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Customer.getCustomer(id);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ error: "Error in fetching the data" });
  }
});
// Update a customer
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Customer.updateCustomer(id, req.body);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ error: "Error in fetching the data" });
  }
});
// Add bought product
router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Customer.updateBought(id, req.body);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ error: "Error in fetching the data" });
  }
});
module.exports = router;

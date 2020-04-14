const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const Receipt = require("../objects/Receipt");

// Create a receipt
router.post(
  "/",
  [
    auth,
    [
      check("customer_name", "Please the customer's name").not().isEmpty(),
      check("customer_id", "Please add the customer's id").not().isEmpty(),
      check("product_bought", "Pleae add the product bought").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const data = await Receipt.createReceipt(req.body);

      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Get all receipt
router.get("/", auth, async (req, res) => {
  try {
    const data = await Receipt.getAllReceipt();

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Get a Receipt
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Receipt.getAReceipt(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;

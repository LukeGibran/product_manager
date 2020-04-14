const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const Product = require("../objects/Product");

// Create a product
router.post(
  "/",
  [
    auth,
    [
      check("product_name", "Please add the product name").not().isEmpty(),
      check("product_type", "Please add a product type").not().isEmpty(),
      check("product_price", "Please add a price").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const data = await Product.createProduct(req.body);

      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Get all products
router.get("/", auth, async (req, res) => {
  try {
    const data = await Product.getAllProducts();

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Get a product
router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.getProduct(id);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Update a Product
router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.updateProduct(id, req.body);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Remove Product
router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.deleteProduct(id);

    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;

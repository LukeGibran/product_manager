const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const ProductType = require("../objects/ProductType.js");

// Get All product types
router.get("/", auth, async (req, res) => {
  try {
    validationResult(req).throw();

    const data = await ProductType.getAllProductTypes();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Create One Type
router.post(
  "/",
  [auth, [check("type", "Please add a type").not().isEmpty()]],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const data = await ProductType.createProductType(req.body.type);

      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// Remove One Type
router.delete("/:id", auth, async (req, res) => {
  try {
    validationResult(req).throw();
    const data = await ProductType.removeProductType(req.params.id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
module.exports = router;

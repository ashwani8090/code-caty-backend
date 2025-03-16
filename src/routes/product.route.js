const express = require("express");
const router = express.Router();
const {
  createProduct: createProductValidate,
  updateProduct: updateProductValidate,
} = require("../validators/product.validators");
const validateBody = require("../middleware/validateBody");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

// Create a new product
router.post("/create", validateBody(createProductValidate), createProduct);

// Get all products
router.get("/", getAllProducts);

// Get a product by ID
router.get("/:id", getProductById);

// Update a product by ID
router.put("/:id", validateBody(updateProductValidate), updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
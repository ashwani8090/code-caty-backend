const Joi = require("joi");

// Schema for creating a product
const createProduct = Joi.object().keys({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  description: Joi.string().max(500).optional(),
  category: Joi.string().alphanum().min(3).max(50).required(),
});

// Schema for updating a product (partial updates allowed)
const updateProduct = Joi.object().keys({
  name: Joi.string().min(3).max(100).optional(),
  price: Joi.number().positive().precision(2).optional(),
  description: Joi.string().max(500).optional(),
  category: Joi.string().alphanum().min(3).max(50).optional(),
  id: Joi.string().min(3).max(100)
}).min(1); // Ensure at least one field is updated

// Schema for deleting a product (usually by id)
const deleteProduct = Joi.object().keys({
  id: Joi.string().alphanum().required(),
});

// Schema for fetching a product by id
const getProduct = Joi.object().keys({
  id: Joi.string().alphanum().required(),
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
};

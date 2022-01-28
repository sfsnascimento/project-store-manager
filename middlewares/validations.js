const ProductValidations = require('../schema/ProductValidations');

const validateProduct = (req, res, next) => {
  const { name, quantity } = req.body;

  const validate = ProductValidations.validateProduct(name, quantity);

  if (validate.message) {
    return res.status(validate.code).json({ message: validate.message });
  }

  next();
};

const validateSales = (req, res, next) => {
  const [{ product_id, quantity }] = req.body;

  const validate = ProductValidations.validateSales(product_id, quantity);

  if (validate.message) {
    return res.status(validate.code).json({ message: validate.message });
  }

  next();
};

module.exports = {
  validateProduct,
  validateSales,
};

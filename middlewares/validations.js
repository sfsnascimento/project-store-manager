const ProductValidations = require('../schema/ProductValidations');

module.exports = (req, res, next) => {
  const { name, quantity } = req.body;

  const validateName = ProductValidations.validate(name, quantity);

  if (validateName.message) {
    return res.status(validateName.code).json({ message: validateName.message });
  }

  next();
};

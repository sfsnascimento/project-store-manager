const Product = require('../services/Product');

const getByName = async (req, res) => {
  const { name } = req.body;

  const result = await Product.getByName(name);

  res.status(200).json(result);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await Product.create(name, quantity);

  if (result === 'productExist') return res.status(409).json({ message: 'Product already exists' });

  res.status(201).json(result);
};

module.exports = {
  create,
  getByName,
};

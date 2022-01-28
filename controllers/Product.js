const Product = require('../services/Product');

const getByName = async (req, res) => {
  const { name } = req.body;

  const result = await Product.getByName(name);

  res.status(200).json(result);
};

const getAllProducts = async (_req, res) => {
  const products = await Product.getAllProducts();

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const productById = await Product.getById(id);

  if (!productById) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(productById);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const result = await Product.create(name, quantity);

  if (result === 'productExist') return res.status(409).json({ message: 'Product already exists' });

  res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdated = await Product.update(name, quantity, id);

  if (productUpdated.affectedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({ name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  const productById = await Product.getById(id);

  const { productDeleted } = await Product.deleteProduct(id);

  if (productDeleted.affectedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(productById);
};

module.exports = {
  create,
  getByName,
  getAllProducts,
  getById,
  update,
  deleteProduct,
};

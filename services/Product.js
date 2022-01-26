const Product = require('../models/Product');

const getByName = async (name) => {
  const product = await Product.getByName(name);

  return product;
};

const create = async (name, quantity) => {
  const productExist = await getByName(name);

  if (!productExist) {
    const { insertId } = await Product.create(name, quantity);
    return {
      id: insertId,
      name,
      quantity,
    };
  }

  return 'productExist';
};

module.exports = {
  create,
  getByName,
};

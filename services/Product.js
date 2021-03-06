const Product = require('../models/Product');

const getByName = async (name) => {
  const product = await Product.getByName(name);

  return product;
};

const getAllProducts = async () => {
  const products = await Product.getAllProducts();
  
  return products;
};

const getById = async (id) => {
  const [productById] = await Product.getById(id);
  
  return productById;
};

const create = async (name, quantity) => {
  const productExist = await getByName(name);

  if (productExist.length === 0) {
    const { insertId } = await Product.create(name, quantity);
    return {
      id: insertId,
      name,
      quantity,
    };
  }

  return productExist;
};

const update = async (name, quantity, id) => {
  const productUpdated = await Product.update(name, quantity, id);
  
  return productUpdated;
};

const deleteProduct = async (id) => {
  const productDeleted = await Product.deleteProduct(id);
  
  return productDeleted;
};

module.exports = {
  create,
  getByName,
  getAllProducts,
  getById,
  update,
  deleteProduct,
};

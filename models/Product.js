const connection = require('./connection');

const getByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?', [name],
  );

  return product;
};

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const getById = async (id) => {
  const [productById] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );

  return productById;
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity],
  );

  return result;
};

module.exports = {
  create,
  getByName,
  getAllProducts,
  getById,
};

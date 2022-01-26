const connection = require('./connection');

const getByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?', [name],
  );

  return product;
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
};

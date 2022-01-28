const connection = require('./connection');

const registerDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (current_timestamp())',
  );
return insertId;
};

const registerSales = async (insertId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)'
    + 'VALUES (?, ?, ?)', [insertId, productId, quantity],
  );
};

module.exports = {
  registerSales,
  registerDate,
};

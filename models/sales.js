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

const getAllSales = async () => {
  const [sales] = await connection.execute(
    'SELECT sp.sale_id, s.date, sp.product_id, sp.quantity'
    + ' FROM StoreManager.sales_products AS sp'
    + ' INNER JOIN StoreManager.sales AS s'
    + ' ON sp.sale_id = s.id',
  );

  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    'SELECT s.date, sp.product_id, sp.quantity'
    + ' FROM StoreManager.sales_products AS sp'
    + ' INNER JOIN StoreManager.sales AS s'
    + ' ON sp.sale_id = ? AND s.id = ?', [id, id],
  );

  return sale;
};

module.exports = {
  registerSales,
  registerDate,
  getAllSales,
  getSaleById,
};

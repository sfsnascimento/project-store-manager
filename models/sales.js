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

const updateSale = async (quantity, productId, id) => {
  const [updatedSale] = await connection.execute(
    'UPDATE StoreManager.sales_products'
    + ' SET quantity = ? WHERE product_id = ? AND sale_id = ?', [quantity, productId, id],
  );

  return updatedSale;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE StoreManager.sales, StoreManager.sales_products'
    + ' FROM StoreManager.sales'
    + ' INNER JOIN StoreManager.sales_products'
    + ' WHERE StoreManager.sales.id = ? AND StoreManager.sales_products.sale_id = ?', [id, id],
  );

  return affectedRows;
};

module.exports = {
  registerSales,
  registerDate,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

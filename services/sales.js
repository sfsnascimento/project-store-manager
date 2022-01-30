const Sales = require('../models/sales');

const serialize = (sale) => {
  const saleId = { saleId: sale.sale_id, ...sale };
  delete saleId.sale_id;

  return saleId;
};

const registerSales = async (sales) => {
  const insertId = await Sales.registerDate();

  const salesPromises = sales.map(async ({ product_id, quantity }) => {
    await Sales.registerSales(insertId, product_id, quantity);
  });
  
  await Promise.all(salesPromises);

  return {
    id: insertId, itemsSold: sales,
  };
};

const getAllSales = async () => {
  const sales = await Sales.getAllSales();

  return sales.map(serialize);
};

const getSaleById = async (id) => {
  const sale = await Sales.getSaleById(id);

  return sale;
};

const updateSale = async ([{ quantity, product_id }], id) => {
  const updatedSale = await Sales.updateSale(quantity, product_id, id);

  return updatedSale;
};

const deleteSale = async (id) => {
  const saleDeleted = await Sales.getSaleById(id);
  
  const affectedRows = await Sales.deleteSale(id);

  return {
    saleDeleted,
    affectedRows,
  };
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

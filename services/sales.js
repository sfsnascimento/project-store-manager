const Sales = require('../models/sales');

const serialize = (sale) => ({ ...sale, saleId: sale.sale_id });

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

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
};

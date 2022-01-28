const Sales = require('../models/sales');

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

module.exports = {
  registerSales,
};

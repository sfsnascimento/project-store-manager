const Sales = require('../services/sales');

const registerSales = async (req, res) => {
  const sales = req.body;

  const productSales = await Sales.registerSales(sales);

  res.status(201).json(productSales);
};

module.exports = {
  registerSales,
};

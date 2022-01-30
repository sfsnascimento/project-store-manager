const Sales = require('../services/sales');

const registerSales = async (req, res) => {
  const sales = req.body;

  const productSales = await Sales.registerSales(sales);

  res.status(201).json(productSales);
};

const getAllSales = async (_req, res) => {
  const sales = await Sales.getAllSales();

  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await Sales.getSaleById(id);

  if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await Sales.updateSale(sale, id);

  if (updatedSale.affectedRows === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json({ saleId: id, itemUpdated: sale });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { saleDeleted, affectedRows } = await Sales.deleteSale(id);

  if (affectedRows === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  res.status(200).json(saleDeleted);
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

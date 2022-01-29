require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const {
  validateProduct, 
  validateSales } = require('./middlewares/validations');
  
const {
  create, 
  getByName, 
  getAllProducts, 
  getById, 
  update, 
  deleteProduct } = require('./controllers/Product');

const { 
  registerSales, 
  getAllSales, 
  getSaleById } = require('./controllers/sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/product', getByName);
app.get('/products', getAllProducts);
app.get('/products/:id', getById);
app.post('/products', validateProduct, create);
app.put('/products/:id', validateProduct, update);
app.delete('/products/:id', deleteProduct);

app.post('/sales', validateSales, registerSales);
app.get('/sales', getAllSales);
app.get('/sales/:id', getSaleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

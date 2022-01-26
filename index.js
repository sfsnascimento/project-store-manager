require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const validations = require('./middlewares/validations');
const {
  create, 
  getByName, 
  getAllProducts, 
  getById, 
  update, 
  deleteProduct } = require('./controllers/Product');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/product', getByName);

app.get('/products', getAllProducts);

app.get('/products/:id', getById);

app.post('/products', validations, create);

app.put('/products/:id', validations, update);

app.delete('/products/:id', deleteProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

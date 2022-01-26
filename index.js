require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { create } = require('./controllers/Product');
const validations = require('./middlewares/validations');
const { getByName } = require('./controllers/Product');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getByName);

app.post('/products', validations, create);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

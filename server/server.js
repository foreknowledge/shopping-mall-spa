const express = require('express');
const path = require('path');
const cors = require('cors');

const webpage = express();

webpage.use(
  '/src',
  express.static(path.resolve(__dirname, '../client', 'src'))
);

webpage.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

webpage.listen(process.env.PORT || 3000, () =>
  console.log('WebPage server running ....')
);

const api = express();
api.use(cors());
const products = require('./data/products.js').products;

api.get('/products', (req, res) => {
  const result = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  }));
  return res.json(result);
});

api.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).send('Not Found');
    return;
  }
  return res.json(product);
});

api.listen(process.env.PORT || 8080, () =>
  console.log('API server running ....')
);

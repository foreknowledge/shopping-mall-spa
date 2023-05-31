const express = require('express');
const path = require('path');

const app = express();

app.use('/src', express.static(path.resolve(__dirname, '../client', 'src')));

app.get('/web/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

const products = require('./data/products.js').products;

app.get('/api/products', (req, res) => {
  const result = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  }));
  return res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((product) => product.id === id);
  if (!product) {
    res.status(404).send('Not Found');
    return;
  }
  return res.json(product);
});

app.listen(process.env.PORT || 3000, () => console.log('Server running ....'));

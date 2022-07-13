const express = require('express');
const dotEnv = require('dotenv');
const {
  sendMessageToTopic,
  readMessageFromTopic,
} = require('../kafka-service/kafka');

const app = express();
dotEnv.config();
app.use(express.json());

const products = [];

const PORT = process.env.PORT;

const readMessages = () => {
  readMessageFromTopic('products', (data) => {
    products.push(data);
  });
};

readMessages();

app.post('/api/v1/products', async (req, res) => {
  const { topic } = req.query;
  const { product } = req.body;

  const data = await sendMessageToTopic(product, topic);

  res.send(data);
});

app.get('/api/v1/products', async (req, res) => {
  res.send(products);
});

app.listen(PORT, console.log(`App listening on Port: ${PORT}`));

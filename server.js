import express from 'express';
import cors from 'cors';
import getStockPrices from './routes/index.js';

const app = express();
const port = 5454;

// VARIABLES
const baseURL = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(require('cors')());

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Thanks for trying our API' });
})

app.get('/api/stock', getStockPrices)

app.post('/test', (req, res) => {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})
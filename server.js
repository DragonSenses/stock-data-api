import express from 'express';
import cors from 'cors';
import getStockPrices from './routes/getStockPrices.js';
import getHome from './routes/getHome.js';
import testPost from './routes/testPost.js';

const app = express();
const port = 5454;

// VARIABLES
const baseURL = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;

// MIDDLEWARE
app.use(express.json());
app.use(cors());
// app.use(require('cors')());

// ROUTES
app.get('/', getHome);

app.get('/api/stock', getStockPrices);

app.post('/api/test', testPost);

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})
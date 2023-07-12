import express from 'express';
import cors from 'cors';
const cheerio = require('cheerio');

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


app.get('/api/stock', async (req, res) => {
  const { stock } = req.query;
  console.log('Stock Ticker: ' + stock );

  if(!stock){
    return res.sendStatus(403);
  }

  
  try {
    const stockDataUrl = baseURL(stock);
    console.log('stockDataUrl: ' + stockDataUrl);

    const res = await fetch(stockDataUrl);
    console.log('response: ' + res);

    const $ = cheerio.load(res);
    console.log('cheerio load: ' + $);

    res.sendStatus(200);
  } catch(err){
    console.log('Error Occurred', err);
    res.sendStatus(500);
  }

})

app.post('/test', (req, res) => {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})
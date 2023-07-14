import express from 'express';
import cors from 'cors';
import * as cheerio from 'cheerio';

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

  /* 
    fetch(stockDataUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const $ = cheerio.load(data);
        console.log($.html());
      })
      .catch(err => console.log(err))
  */
  
  try {
    const stockDataUrl = baseURL(stock);
    console.log('stockDataUrl: ' + stockDataUrl);

    const stockRes = await fetch(stockDataUrl);
    console.log('response: ' + stockRes);

    const data = await stockRes.text();
    // console.log('data: ' + data);

    const $ = cheerio.load(data);
    // console.log('cheerio load: ' + $);
    // console.log($.html());

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
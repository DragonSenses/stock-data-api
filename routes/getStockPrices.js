import fetchPrice from '../utils/fetchPrice.js';

// VARIABLES
const baseURL = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;

export default async function getStockPrices(req, res) {
  const { stock } = req.query;
  console.log('Stock Ticker: ' + stock);

  if (!stock) {
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
    // console.log('response: ' + stockRes);

    const data = await stockRes.text();
    // console.log('data: ' + data);

    const prices = fetchPrice(data);
    console.log('prices: ' + prices);

    res.status(200).send({ prices });
  } catch (err) {
    console.log('Error Occurred', err);
    res.sendStatus(500);
  }

}
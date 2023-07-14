import * as cheerio from 'cheerio';

/**
 * Fetches & returns the Adj Close** prices 
 * (Adjusted close price adjusted for splits and
 * dividend and/or capital gain distributions)
 * @param {*} html data of the response of the web-page to scrape
 * @returns an array of the Adj Close prices
 */
export default function fetchPrice(html) {
  const $ = cheerio.load(html);
  // console.log($.html());
  const prices = $('td:nth-child(6)')
    .get()
    .map(val => $(val).text());

  return prices;
}
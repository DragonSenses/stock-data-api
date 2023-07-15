# Documents the Development of this Project

# Steps to create the project

#### 0. Create `.gitignore` file to ignore `node_modules`

Step is optional if you are not using `git` or `GitHub`, or any form of version control.

If creating a repository with `git`, have to create a `.gitignore` file at thhe root of the project.

```sh
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 1. Initialize npm

Create a folder named `/stock-data-api` where you want the project directory to be.

`cd` into it an initialize npm with

```sh
npm init -y
```

This creates a `package.json` file which allows us to interact with [npm - Node Package Manager](https://docs.npmjs.com/cli/v8/commands/npm-init). The `-y` parameter skips all the question prompts in the terminal.

### Install Express

```sh
npm i express
```

### Install nodemon

```sh
npm i --save-dev nodemon
```

This creates a development dependency of [nodemon](https://www.npmjs.com/package/nodemon).

Now open the project with Visual Studio Code

```sh
code .
```

### Create a command for development

Inside `package.json`, create a script inside of `scripts` to run our development.

```json
{
  // ...
  "scripts": {
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```

#### Enable EcmaScript modules

[`package.json` `"type"` field](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_package_json_type_field)

While we are still here, add the following line 

```js
"type": "module",
```

inside `package.json`

```json
{
  "name": "stock-data-api",
  "version": "1.0.0",
  "description": "A Stock data API built with Node.js and Express.js",
  "type": "module",
  // ...
}
```

This will enable ES6 modules to allow us to `import` modules instead of using `require` syntax

## Create the file `server.js`.

Now inside the file we can use the `express` package with either

- CommonJS (cjs) using `require()`

```js
const express = require('express');
const app = express();
```

- ES6 modules using `import`

```js
import express from 'express';
const app = express();
```

I am using modules because [ECMAScript modules](https://nodejs.org/api/esm.html#introduction) are the official standard format to package JavaScript code for reuse. The only drawback is compatibility with older versions of Node (i.e., Node.js v9 and under) or old packages/libraries. Otherwise, adhere to the new standard since it is more readable and was designed to be statically analyzable. 

To be analyzed statically means that the `import`/`export` statements can be anaylzed at build time, enabiling tools like bundlers and compilers to optimize the code and generation smaller, more efficient bundles for production use. CommonJS modules othe the other hand require addtional tooling to do so. CommonJS was built during a time when there was no module system.

[ES6 modules Benefits Summary from this article](https://dev.to/costamatheus97/es-modules-and-commonjs-an-overview-1i4b):

- Static Analysis
- Native supprt in browsers
- Better performance
- Improved Code organization 

### Express - Bind and listen to the connections

Now let's create a port number and **bind and listen to the connections on the specified host and port**.

```js
import express from 'express';

const app = express();
const port = 5454;

app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
})
```

If port number is omitted, then OS will assign an arbitrary unused port number (useful for automated tasks such as tests). `app.listen()` returns an `http.Server` object.

This will now *listen* to incoming requests, when the server is running.

## Setup the Middleware

Still in `server.js`, add the line:

```js
// MIDDLEWARE
app.use(express.json());
```

Allows our project to retrieve JSON that may come in the form of a POST request.

### Install CORS package

[npm cors](https://www.npmjs.com/package/cors).

```sh
npm i cors
```

```js
import cors from 'cors';

app.use(cors());
```

Enable Cross-Origin-Requests.

Alternative:

```js
app.use(require('cors')());
```

# Routes

Routes are analagous to API endpoints we can define.

API routes are a way of defining endpoints that can be accessed by clients. They are used to define the structure of an API and how it can be accessed. An API route is a combination of an HTTP method and a resource path. For example, GET /users would be an API route that returns a list of users. You can define specific HTTP methods for your route or use the ANY method to match all methods that you haven't defined for a resource¹.

Let's define the routes.

```js
// ROUTES
app.get('/', (req, res) => {
  
})
```

The verb we use is `GET` to make a get route. In express, we call `get()` passing in two arguments the path and the function or logic to execute when request hits that particular route.

To create a `POST` route:

```js
app.post('/', (req, res) => {
  
})
```

Now inside the function we have access to the request and the response via `req` and `res` respectively.

## The home route

Let's define what to do for the GET home route. Send a successful response with a json message of thanking the user for trying the API.

```js
app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Thanks for trying our API' });
})
```

## Get route for stock API

```js
app.get('/api/stock', (req, res) => {
  const { stock } = req.query;
})
```

Let's change the route to our api. Then destructure out the `stock` value from the `req.query`.

There is 3 different ways you can retrieve information from an incoming network request.

1. From the `query`
2. The `parameter`
3. From the `body`
  - `body` only exists with `POST` request


## Post route

```js
app.post('/api/test', (req, res) => {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
})
```

### Install Cheerio

To extract and retrieve stock information we need cheerio.

[cheerio](https://www.npmjs.com/package/cheerio), a web-scraper that can be used with JavaScript and is compatible with Node.js.

```sh
npm i cheerio
```

To use:

```js
// ES6 or TypeScript:
import * as cheerio from 'cheerio';

const $ = cheerio.load('<ul id="fruits">...</ul>');

$.html();
//=> <html><head></head><body><ul id="fruits">...</ul></body></html>
```

## Working on the stock GET route

We need to be able to retrieve information. Going to use [Yahoo Finance](https://finance.yahoo.com), while checking stock history with a link like this: `https://finance.yahoo.com/quote/ATVI/history?p=ATVI`.

So we create a `baseUrl` with string parameter `stock` passed into a template string.

```js
// VARIABLES
const baseURL = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;
```

Then in the route we want to be able to get that URL saved as `stockDataUrl` then fetch it.

```js
app.get('/api/stock', async (req, res) => {
  const { stock } = req.query;

  if(!stock){
    return res.sendStatus(403);
  }
  
  try {
    const stockDataUrl = baseURL(stock);
    const res = await fetch(stockDataUrl);

  } catch(err){
    console.log(err);
  }
  
})
```

Now use cheerio, first create a `cheerio` instance:

```js
import * as cheerio from 'cheerio';
```

Then within the `try..` use `cheerio.load()` with `res` as the argument.

```js
const $ = cheerio.load(res);
```

Also send the status 200 on success and 500 on error.

```js
  try {
    
    const stockDataUrl = baseURL(stock);
    const res = await fetch(stockDataUrl);
    const $ = cheerio.load(res);
    console.log($.html);
    res.sendStatus(200);

  } catch(err){

    console.log('Error Occurred', err);
    res.sendStatus(500);

  }
```

Also print out the `html` code:
```js
console.log($.html());
```

Get the `data` from the response, in `text` form:

```js
    const data = await stockRes.text();
```

# Emulate HTTP Network Requests with **REST Client**

In Visual Studio Code, get the [REST Client for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

We can now emulate HTTP Network requests with a `rest` file, and run network requests straight from VSCode.

At the project directory, create `test.rest` file.

```sh
###
GET http://localhost:5454/api/stock?stock=ATVI
```

Now we can go to VSCode, open `test.rest` file, and right above the `GET` line we can see a `Send Request` we can click on. The server must be running with `npm run dev`.

Now when we send that request we can see another window open in VSCode with REST Client.

---

## Inspect HTML elements we wish to select

Go to the web page, and find the HTML element we wish to gather the data from.

We can see through Chrome Dev Tools and inspect element that it is a `<td>` element, to get the one with the **Adj Close** category it is the 6th `td` element within the `tr`.

Let's access this data:

```js
const prices = $('td:nth-child(6)');
console.log('prices: ' + prices);
```

We access all the HTML data through `$`, then pass in a selector. This time the `nth-child(6)`.

Also send the status along with the `prices` object passed as an object.

```js
res.status(200).send({ prices });
```

#### Issue: Converting circular structure to JSON

`prices` is an element so we need to convert it by using `get()`.

```js
const prices = $('td:nth-child(6)').get();
```

Next issue we come across is that now it comes in as an array, so we need to `map()` out every element.

The mapping function should be the `val` value converted by to a cheerio element `$(val)`, then call `.text()` to get the text from it.

```js
const prices = $('td:nth-child(6)')
  .get()
  .map(val => $(val).text());
```

# Scrape the stock prices and send back the response

Now in `test.rest` send the request one more time.

We can see the `Response` to the right where `REST Client` can be seen. We got a object containing an array of `prices` with 100 values (showing the price for the last 100 days).

```js
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 812
ETag: W/"32c-jcDaktJHu8CViNha1b900KA7ZMw"
Date: Fri, 14 Jul 2023 00:21:19 GMT
Connection: close

{
  "prices": [
    "89.54",
    "90.00",
    // ...
    ]
}
```

# Refactoring

Refactoring is the process of restructuring existing computer code — changing the factoring — without changing its external behavior. 

It is intended to improve the design, structure, and/or implementation of the software (its non-functional attributes), while preserving its functionality.

## Refactor `fetchPrice` logic

Create a `utils` folder with `index.js` file within.

We are moving the web-scraping logic outside of the `server.js` and into a function within `fetchPrice.js`.

```js
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
```

#### Error [ERR_MODULE_NOT_FOUND] issue

Now import the `utils` function `fetchPrice` in `server.js`. 

Since we are using ES6 Modules, make sure to add `.js` at the end of the import. This will solve the [ERR_MODULE_NOT_FOUND] issue.

```js
import fetchPrice from './utils/fetchPrice.js';
```

Now call invoke the function passing in the html `data`.

```js
  try {
    const stockDataUrl = baseURL(stock);

    const stockRes = await fetch(stockDataUrl);

    const data = await stockRes.text();

    const prices = fetchPrice(data);

    res.status(200).send({ prices });
  } catch(err){
    console.log('Error Occurred', err);
    res.sendStatus(500);
  }
```

## Refactor `fetchStockPrices` logic

The entire callback function of:

```js
app.get('/api/stock', async (req, res) => {
  const { stock } = req.query;
  console.log('Stock Ticker: ' + stock );

  if(!stock){
    return res.sendStatus(403);
  }
  
  try {
    const stockDataUrl = baseURL(stock);

    const stockRes = await fetch(stockDataUrl);

    const data = await stockRes.text();

    const prices = fetchPrice(data);

    res.status(200).send({ prices });
  } catch(err){
    console.log('Error Occurred', err);
    res.sendStatus(500);
  }

})
```

Can be refactored to improve readability. We can move all the logic into a separate file in a folder we create called `/routes`.

So now the route in `server.js` can be simplified to:

```js
app.get('/api/stock', getStockPrices);
```

In `routes`, we create the file called `index.js` with a `async` function called `getStockPrices`:

Let's export it right away. In CommonJS, we export functions like so:

```js
async function getStockPrices() {
  // ...
}

module.exports = { getStockPrices }
```

But we can convert it to **ES module**:

```js
async function getStockPrices() {
  // ...
}

export default { getStockPrices }
```

### Issue: Error: Route.get() requires a callback function but got a [object Object]

There is an issue on the export imports and `getStockPrices` is not recognized so we need to change a few things.

In `/routes`, rename `index.js` to `getStockPrices.js`. Then change to `export default async function getStockPrices()`

```js
import fetchPrice from '../utils/fetchPrice.js';

// VARIABLES
const baseURL = (stock) => `https://finance.yahoo.com/quote/${stock}/history?p=${stock}`;

export default async function getStockPrices(req, res) {
  const { stock } = req.query;
  console.log('Stock Ticker: ' + stock);

  if (!stock) {
    return res.sendStatus(403);
  }

  try {
    const stockDataUrl = baseURL(stock);

    const stockRes = await fetch(stockDataUrl);

    const data = await stockRes.text();

    const prices = fetchPrice(data);

    res.status(200).send({ prices });
  } catch (err) {
    console.log('Error Occurred', err);
    res.sendStatus(500);
  }

}
```

Then in `server.js`, import the function properly and use it:

```js
import getStockPrices from './routes/getStockPrices.js';

// ...

app.get('/api/stock', getStockPrices);
```

Now testing in `test.rest` shows that it still works ok.

## **Improve Code Navigation** through well-named and structured folders/files

Two kinds of modules:

1. Modules that contain a library, pack of functions
2. Modules that declare a single entity

Second approach is preferred so that every thing resides in its own module. The only downside is that it requires a lot of files as everthing wants its own module, but that's not a problem at all. In fact, code navigation becomes easier if files are well-named and structured into folders.

Modules provide a special `export default` ("the default export") syntax to make the "one thing per module" approach look better & cleaner.

### Refactor Express route callback functions (a.k.a. handler functions)

See [Express Routing](https://expressjs.com/en/guide/routing.html).

- For every callback function route in `server.js` going to make them their own module. e.g.,

```js
app.get('/', (req, res) => {
  res.status(200).send({ message: 'Thanks for trying our API' });
})
```

Will become 

```js
import getHome from './routes/getHome.js';

app.get('/', getHome)
```

And in `/routes/getHome.js`,

```js
export default async function getHome(req, res) {
  res.status(200).send({ message: 'Thanks for trying our API' })
}
```

Likewise, create `testPost.js` in `/routes`

```js
export default async function testPost(req, res) {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
}
```

Import it in `server.js`
```js
import testPost from './routes/testPost.js';
```

Then replace callback function with the `testPost`:

```js
app.post('/api/test', (req, res) => {
  const body = req.body;
  const { message } = body;
  console.log('Message:' + message );
  res.sendStatus(200);
})
```

To

```js
app.post('/api/test', testPost);
```

## Testing Routes

In `test.rest`, add the POST request

```sh
###
GET http://localhost:5454/api/stock?stock=ATVI

###
POST http://localhost:5454/api/test
Content-Type: application/json

{
  "message": "hello"
}
```

### API parameter to access data

Another way to access data is by having a *parameter*.

Let's make a `GET` route to demonstrate this:

```js
import getParamsTest from './routes/getParamsTest.js';

app.get('/api/testParams/:bananaParameter', getParamsTest);
```

The semi-colon `( : )` in API routes are used as separator for parameters in the URL. It is used instead of the question mark `?` which is used in query parameters. 

**The semicolon is used to separate the path from the parameters.**

Now let's create that function route in `/routes` called `getParamsTest.js`

```js
export default function getParamsTest(req, res){
  const { bananaParameter } = req.params;

  console.log('The banana parameter is: ' + bananaParameter);

  res.sendStatus(200);
}
```

Now create the request on `test.rest` and pass in a value named `bananaData` as a parameter:

```sh
###
GET http://localhost:5454/api/testParams/bananaData
```

After sending the request, we can see `bananaParameter` adopted the `bananaData` name.

```sh
Server has started on port: 5454
The banana parameter is: bananaData
```


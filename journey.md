# Documents the Development of this Project

A simple Express API (Application Programming Interface). 

An API is a set of protocols that enable different software components to communicate and transfer data.

A lot of complicated logic is hidden behind an API to make it easier to interface with.

One can fire off a simple network request where we give them a simple method of interacting with our API. This method is the interface, which executes logic in the background hidden from the user. User just gets to experience the output.

#### Metaphor - think of APIs like restaurants

[Postman - What is an API?](https://www.postman.com/what-is-an-api/).

- In this metaphor, the customer is like the user, who tells the waiter what she wants. 
- The waiter is like an API, receiving the customer's order and translating it into easy-to-follow instructions for the kitchen—sometimes using specific codes or abbreviations that the kitchen staff will recognize. 
- The kitchen staff is like the API server because it creates the order according to the customer's specifications and gives it to the waiter, who then delivers it to the customer.

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

# Middleware

[TheOdinProject on Middleware](https://www.theodinproject.com/lessons/nodejs-express-101#middleware).

**A *middleware* is just a plain JavaScript function that Express will call for you between the time it receives a network request and the time it fires off a response (i.e. it's a function that sits in the middle).**

You will eventually be using several of these functions that will run in a specific sequence for every request.

## Examples

- For example, you might have a logger (that prints details of the request to the console)
- An authenticator (that checks to see if the user is logged in, or otherwise has permission to access whatever they're requesting) 
- and a static-file server (if the user is requesting a static file then it will send it to them). 

All of these functions will be called in the order you specify every time there's a request on the way to your `app.get("/")` function.

### A Middleware function

Middleware functions are just plain JavaScript functions with a specific function signature (that is, it takes a specific set of arguments in a specific order).

```js
function(req, res, next) {
  // do stuff!
}
```

The three middleware function arguments are: `req`, `res`, and `next`. Technically, these are just variables, so you could call them anything, but convention (and the express documentation) almost always give them these names.

### Creating the Middleware for API

Create a folder called `middleware`, then inside create `middlewareInterceptor.js`

```js
export default function middlewareInterceptor(req, res, next) {
  console.log('I AM THE MIDDLE MAN');
  const { password } = req.query;

  if(!password) { 
    // Forbid access if no password is present
    return res.sendStatus(403);
  }

  // Pass control to the next middleware function or next defined function
  next();
}
```

This middleware will intercept routes. 

Useful for:
- rate limit the API
- personal API key for users

### Protecting routes with Middleware

We can now protect certain routes by passing in middleware interceptor in between path and actual function.

Let's protect the `GET` route that fetches stock prices, so in `server.js`

This route before its protected by middleware:

```js
app.get('/api/stock', getStockPrices);
```

After: route is now protected
```js
import middlewareInterceptor from './middleware/middlewareInterceptor.js';

app.get('/api/stock', middlewareInterceptor, getStockPrices);
```

Code will be intercepted by the middleware, which so far will just check for an existing password. 

Let's modify it to check for a valid password:

```js
export default function middlewareInterceptor(req, res, next) {
  console.log('I AM THE MIDDLE MAN');
  const { password } = req.query;

  if(password !== '1234') { 
    // Forbid access if password is not correct
    return res.sendStatus(403);
  }

  // Pass control to the next middleware function or next defined function
  next();
}
```

Now first let's send the request in `test.rest` without the password:

```sh
###
GET http://localhost:5454/api/stock?stock=ATVI
```

We get a `Response` from the Rest client:

```sh
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/plain; charset=utf-8
Content-Length: 9
ETag: W/"9-PatfYBLj4Um1qTm5zrukoLhNyPU"
Date: Sat, 15 Jul 2023 19:26:36 GMT
Connection: close

Forbidden
```

Now send the request WITH the password:

```sh
###
GET http://localhost:5454/api/stock?stock=ATVI&password=1234
```

The `Response`:

```sh
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 812
ETag: W/"32c-xpjt/F2AvVns6qfyqluGuT7l6TQ"
Date: Sat, 15 Jul 2023 19:32:17 GMT
Connection: close

{
  "prices": [
    "90.07",
    // ...
  ]
}
```

## Use Middleware for all routes

To authenticate every route rather than just one `GET` route, we can add:

```js
app.use(middlewareInterceptor);
```

Now every route is forbidden `403` unless we pass in the proper password.

# Push to Production

We can add a [Web Service on Render](https://render.com/docs/web-services). Link it up to the repo and deploy the service.

## If you get the `ERROR ReferenceError: fetch is not defined`

The fix is to specify the `node` version within `package.json` file.

Just add `"engines"` like so:

```json
{
  "name": "stock-data-api",
  "version": "1.0.0",
  "description": "A Stock data API built with Node.js and Express.js",
  "main": "index.js",
  "type": "module",
  "engines": {
    "node" : ">18"
  },
  
```

Re-deploy on render and service can go live now.

Test the Request again through the live API.

# Maintenance: dependency/package management

**Package management**, also known as **dependency management**, involves updating packages and dependencies within a project. Tools like `npm` (Node Package Manager) facilitate updating packages to their latest versions.

Useful commands:

- [npm outdated](https://docs.npmjs.com/cli/v10/commands/npm-outdated)
- [npm update](https://docs.npmjs.com/cli/v10/commands/npm-update)

We can run the following command to check for outdated packages in our project:

```sh
npm outdated
```

#### **Wanted version** of a package

The `wanted` column in the `npm outdated` command refers to the **maximum version** of a package that satisfies the semver range specified in your `package.json`. Here's what it means:

- If a semver range is defined in your `package.json`, the `wanted` version represents the latest version within that range.
- If there's no semver range (e.g., when running `npm outdated --global` or if the package isn't included in `package.json`), the `wanted` version shows the currently-installed version.

In summary, `wanted` indicates the version you should update to based on your package constraints. If you prefer the latest version, consider updating to the one shown in the `latest` column. 

#### What's **semver**?

**Semver** (short for **Semantic Versioning**) is a versioning system used in the Node.js ecosystem, particularly by npm (Node Package Manager). It provides a consistent way to manage package dependencies. Here are the key points about semver:

1. **Version Format:**
   - Semver follows the format `MAJOR.MINOR.PATCH`.
   - **MAJOR**: Indicates breaking changes.
   - **MINOR**: Introduces new features without breaking existing functionality.
   - **PATCH**: Fixes issues or provides backward-compatible updates.

2. **Usage in npm:**
   - All packages published to npm are assumed to follow semver semantics.
   - Package authors use semver to define dependency versions bundled with their packages.

3. **Example:**
   - Suppose a package has version `1.2.3`.
     - Incrementing the **MAJOR** version (e.g., `2.0.0`) implies breaking changes.
     - Incrementing the **MINOR** version (e.g., `1.3.0`) adds features without breaking compatibility.
     - Incrementing the **PATCH** version (e.g., `1.2.4`) includes backward-compatible fixes.

semver helps maintain compatibility and ensures smooth package updates.

#### Install the latest minor version of npm package

To install only the **wanted** versions of each npm package run the following command:

chore: Update dependencies to latest semver range

```sh
npm update --save
```

Or we can run `npm install` with specific requirements. 

To install the latest minor version:

```sh
npm install package-name@"^2.x.x"
```

To install a package right before the latest major update run the following command:

```sh
npm install package-name@"<next-major.0.0"
```

For example:

```sh
npm install package-name@"<3.0.0" 
```

Would install the latest right before 3.0.0 (e.g. 2.11.1)

## Dependency log

(May 21, 2024)
```sh
npm outdated

Package  Current  Wanted  Latest  Location              Depended by
express   4.18.2  4.19.2  4.19.2  node_modules/express  stock-data-api
nodemon    3.0.1   3.1.0   3.1.0  node_modules/nodemon  stock-data-api
```

chore: Update dependencies to latest versions

```sh
npm update --save
```
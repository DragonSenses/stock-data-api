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
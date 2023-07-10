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

Create the file `server.js`.

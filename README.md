# Basic React, Typescript & Webpack

## Status

[![Build Status](https://travis-ci.org/melxx001/redux-starter.svg?branch=master)](https://travis-ci.org/melxx001/redux-starter) [![Coverage Status](https://coveralls.io/repos/github/melxx001/redux-starter/badge.svg?branch=master)](https://coveralls.io/github/melxx001/redux-starter?branch=master)

This branch has a basic example of React with Typescript bundled using Webpack.

## Installation

Run `npm install` to install all packages.

If you look at the package.json:

```
"scripts": {
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && node_modules/.bin/webpack",
    "test": "echo \"Error: no test specified\" && exit 1",
    "typings": "node_modules/.bin/typings install"
  },
```

Once `npm install` completes, then the `postinstall` will execute and create the necessary typings (`npm run typings`) and run webpack (`node_modules/.bin/webpack`) to bundle into the folder `_build`.

# Run the project

Run `npm run dev' and browse to http://localhost:8080/

## Testing

`npm test`

## Coverage

`npm run coverage`

## Linting

`npm run lint`

## Modules Installed

- React
- TypeScript
- Webpack



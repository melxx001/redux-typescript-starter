# Basic React, Typescript & Webpack


This branch has a basic example of React with Typescript bundled using Webpack.

## Run the project

`npm install` and open index.html

If you look at the package.json:

```
  "scripts": {
    "build": "node_modules/.bin/webpack",
    "dev": "npm run build && node_modules/.bin/webpack-dev-server --config webpack.config.dev.js",
    "lint": "npm run lint:js && npm run lint:tsc",
    "lint:js": "node_modules/.bin/eslint .",
    "lint:tsc": "node_modules/.bin/tslint src/**/*.ts{,x}",
    "postinstall": "npm run typings && npm run build",
    "test": "echo \"no test specified\" && exit 0",
    "typings": "node_modules/.bin/typings install"
  },
```

Once `npm install` completes, then the `postinstall` will execute:

- We will create the necessary typings (`npm run typings`)
- Run webpack (`node_modules/.bin/webpack`) to bundle into the folder `_build`
- Run npm run dev to start the project using Webpack Dev Server

## Modules Installed

- React
- TypeScript
- Webpack, Webpack Dev Server

## Linting

`npm run lint`



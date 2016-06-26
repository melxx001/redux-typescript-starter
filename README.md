# Basic React, Typescript & Webpack


This branch has a basic example of React with Typescript bundled using Webpack.

## Run the project

`npm install` and open index.html

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

Once `npm install` completes, then the `postinstall` will execute. We will create the necessary typings (npm run typings) and finally run webpack (node_modules/.bin/webpack) to bundle into the folder `_build`.

## Modules Installed

- React
- TypeScript
- Webpack

## Linting

`npm run lint`



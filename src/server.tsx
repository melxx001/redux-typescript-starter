import * as express from 'express';
import * as React from 'react';
import * as path from 'path';

import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import configureStore from './store';
import HtmlContainer from './layout/html';
import RouteContainer from './routes';

let Html = HtmlContainer;
let Route = RouteContainer;

const app = express();
const hostname = 'localhost';
const port = 8080;
const sitePort = 3000;

declare var __PRODUCTION__: Boolean; // Populated by webpack

function getMarkup(store: any, render_props: any) {
  const uri = __PRODUCTION__ ? 'assets' : `http://${hostname}:${sitePort}/client`;

  const component = (
    <Provider store = {store} key = "provider">
      <RouterContext {...render_props} />
    </Provider>
  );

  return '<!DOCTYPE html>' + renderToString(
      <Html
        component = {component}
        script = {`${uri}/index.js`}
        state = {store.getState()}
      />
    );
}
if (__PRODUCTION__) {
  app.use('/assets', express.static(path.join('_client')));
}

app.use(function (req: any, res: any) {
  match({
    location: req.url,
    routes: Route
  }, function (error, redirectionLocation, render_props) {
    if (error) {
      console.error('Router error:', error);

      res.status(500).send(error.message);
    } else if (redirectionLocation) {
      res.redirect(302, redirectionLocation.pathname + redirectionLocation.search);
    } else if (render_props) {
      const store = configureStore({});

      res.status(200).send(getMarkup(store, render_props));
    } else {
      res.status(400).send('Not Found');
    }
  });
});

declare const module: { hot: any };

app.listen(port, function (error: any) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> Open up http://${hostname}:${port}/ in your browser.`);
  }
});

if (module.hot) {
  console.info('[HMR] Server is listening…');

  module.hot.accept('./layout/html', function () {
    console.info('[HMR] Patching Html');

    Html = require('./layout/html').default;
  });

  module.hot.accept('./routes', function () {
    console.info('[HMR] Patching Route');

    Route = require('./routes').default;
  });
}

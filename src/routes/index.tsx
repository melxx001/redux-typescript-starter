import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../layout';
import About from '../views/about';
import Home from '../views';
import NotFound from '../views/404';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="/about" component={About} />

    <Route path="*" component={NotFound} />
  </Route>
);

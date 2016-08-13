import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './routes';

const Component = (
  <Router history={browserHistory}>
    {Routes}
  </Router>
);

render(Component, document.getElementById('example'));

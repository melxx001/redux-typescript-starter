import * as React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './routes';

const component = (
  <Router history={browserHistory}>
    {Routes}
  </Router>
);

render(component, document.getElementById('example'));

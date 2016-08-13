import * as React from 'react';
import * as test from 'tape';

import { render } from 'react-dom';
import { Router, createMemoryHistory } from 'react-router';
import Routes from '../routes';

require('jsdom-global')(); // Used to make available the DOM element document

const Routing = (
  <Router history={createMemoryHistory('/')}>
    {Routes}
  </Router>
);

test('Test Routes', (t: test.Test) : void => {
  let node = document.createElement('div');

  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('Index'), -1, 'Index page found');
  });

  Routing.props.history.push('/hello');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('This page uses TypeScript and React!'), -1, 'Hello page found');
  });

  Routing.props.history.push('/about');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('About'), -1, 'About page found');
  });

  Routing.props.history.push('/doesnotexist');
  render((Routing), node, () => {
    t.notEqual(node.textContent.indexOf('404'), -1, '404 page found');
  });

  t.end();
});

import * as React from 'react';
import * as test from 'tape';

import { render } from 'react-dom';
import { Router, createMemoryHistory } from 'react-router';
import Routes from '../routes';

require('jsdom-global')();

test.only('Test Routes', (t: test.Test) : void => {
  const node = document.createElement('div');
  const Component = (
    <Router history={createMemoryHistory('/hello')}>
      {Routes}
    </Router>
  );

  render((Component), node, () => {
    t.notEqual(node.textContent.indexOf('This page uses TypeScript and React!'), -1, '404 reached');
  });

  t.end();
});

import * as React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';

import configureStore from './store';
import Routes from './routes';

const store = configureStore();

const Component = (
  <Provider store={store} key="provider">
    <Router history={browserHistory} routes={Routes} />
  </Provider>
);

render(Component, document.getElementById('example'));

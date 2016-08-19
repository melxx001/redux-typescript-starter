import * as React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store';
import Routes from './routes';

const store = configureStore();

// Needed to add the "any" type to prevent compilation errors
const createHistory: any = createHashHistory;
const appHistory: any = useRouterHistory(createHistory)({ queryKey: false });
const history: any = syncHistoryWithStore(appHistory, store);

const Component = (
  <Provider store={store} key="provider">
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>
);

render(Component, document.getElementById('example'));

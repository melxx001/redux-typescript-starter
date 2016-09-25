import * as React from 'react';
import * as test from 'tape';

import configureStore from './store';
declare const module: { hot: any };

test('Test Store', (t: test.Test) : void => {
  let store = configureStore();
  t.equal(store.getState().counterReducer, 0, 'Check default store data');

  store = configureStore({ counterReducer: 1 });
  t.equal(store.getState().counterReducer, 1, 'Check store data');


  module.hot = {
    accept: (dep: any, callback: Function) => {
      callback();
    }
  };
  store = configureStore({ counterReducer: 0 }, module);
  t.equal(store.getState().counterReducer, 0, 'Check hot module replacement');

  t.end();
});

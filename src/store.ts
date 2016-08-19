const thunk = require('redux-thunk').default;
import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
declare const module: { hot: any };

export default function configureStore(initialState: any = { counterReducer: 0 }, mod: any = module) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (mod.hot && typeof mod.hot.accept === 'function') {
    mod.hot.accept('./reducer', () => {
      const nextReducer = reducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

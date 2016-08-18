const thunk = require('redux-thunk').default;
import {applyMiddleware, createStore} from 'redux';
import reducer from './reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
declare var module: { hot: any };

export default function configureStore(initialState: any = { counterReducer: 0 }) {
  const store = createStoreWithMiddleware(reducer, initialState);
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = reducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

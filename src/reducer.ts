import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {counterReducer} from './components/reducers/counter';

export default combineReducers({
  counterReducer,
  routing: routerReducer
});

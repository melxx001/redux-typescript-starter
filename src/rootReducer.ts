import {combineReducers, Reducer} from 'redux';
import {routerReducer} from 'react-router-redux';
import {counterReducer} from './components/reducers/counter';
import {todoReducer, visibilityFilterReducer} from './components/reducers/todo';

export interface ReducerState {
  todoReducer: Array<any>;
  visibilityFilterReducer: string;
  counterReducer: Number;
  routing: Reducer<any>;
}

export default combineReducers({
  todoReducer,
  visibilityFilterReducer,
  counterReducer,
  routing: routerReducer
});

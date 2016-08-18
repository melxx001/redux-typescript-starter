import * as test from 'tape';
import {increment, decrement} from '../actions/counter';
import {counterReducer} from './counter';

test('Reducers Test', (t: test.Test) : void => {
  t.equal(counterReducer(0, increment()), 1, 'Test increment');
  t.equal(counterReducer(1, decrement()), 0, 'Test decrement');
  t.equal(counterReducer(null, increment()), 1, 'Test null state');
  t.equal(counterReducer(undefined, increment()), 1, 'Test undefined state');
  t.equal(counterReducer(0, { type: 'unknown' }), 0, 'Test unknown action type');
  t.equal(counterReducer(), 0, 'Test missing action type');
  t.end();
});

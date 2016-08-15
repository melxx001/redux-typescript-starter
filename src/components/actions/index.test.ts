import * as test from 'tape';
import * as counter from './index';

test.only('Test', (t: test.Test) : void => {
  const increment = counter.increment();
  const decrement = counter.decrement();

  t.equal(increment.type, counter.INCREMENT, 'Action returns correct increment type');
  t.equal(decrement.type, counter.DECREMENT, 'Action returns correct decrement type');
  t.end();
});

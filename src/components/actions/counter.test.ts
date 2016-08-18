import * as test from 'tape';
import * as counter from './counter';

test('Actions Test', (t: test.Test) : void => {
  const increment = counter.increment();
  const decrement = counter.decrement();

  t.equal(increment.type, counter.INCREMENT, 'Test increment action');
  t.equal(decrement.type, counter.DECREMENT, 'Test decrement action');
  t.end();
});

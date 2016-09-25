import * as React from 'react';
import * as test from 'tape';
import { createRenderer } from 'react-addons-test-utils';

import * as Actions from './actions/counter';
import {CounterComponent, mapDispatchToProps, getActions, mapStateToProps} from './Counter';

test('Counter Presentation Tests', (t: test.Test) : void => {
  const increment = (a: number) => { return a + 1; };
  const decrement = (a: number) => { return a - 1; };

  const test1 = <CounterComponent counter={0} decrement={decrement} increment={increment} />;
  t.deepEqual(test1.props,
    { counter: 0, decrement, increment }, 'Check Counter props');

  const renderer = createRenderer();
  renderer.render(<CounterComponent counter={0} decrement={increment} increment={decrement} />);
  const result = renderer.getRenderOutput();
  t.equal(result.type, 'div', 'Check Counter returns div');

  t.end();
});

test('Counter Tests', (t: test.Test) : void => {
  let actions: any = {
    a: 1,
    b: 2,
    method1: (a: number) => (a + 1),
    method2: (a: number) => (a - 1),
  };
  let test: any = getActions(actions);
  let expected: any = {method1: actions.method1, method2: actions.method2};

  t.deepEqual(test, expected, 'Check getActions method');

  const state = {
    counterReducer: 1
  };

  t.deepEqual(mapStateToProps(state), {counter: 1}, 'Check mapStateToProps method');

  actions = Actions;
  test = Object.keys(mapDispatchToProps(''));
  expected = Object.keys(Actions).filter(a => (typeof actions[a] === 'function'));
  t.deepEqual(test, expected, 'Check mapDispatchToProps method');

  t.end();
});

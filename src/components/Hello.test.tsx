import * as React from 'react';
import * as test from 'tape';

import { Hello } from './Hello';

test('test', (t: test.Test) : void => {
  t.equal(typeof Hello, 'function', 'Check if Hello is a function');

  const test = <Hello compiler="TypeScript" framework="React" />;
  t.deepEqual(test.props, { compiler: 'TypeScript', framework: 'React' }, 'Check is Hello returns correctly');
  t.end();
});

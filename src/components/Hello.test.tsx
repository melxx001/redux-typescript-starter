import * as React from 'react';
import * as test from 'tape';
import { createRenderer } from 'react-addons-test-utils';

import { Hello } from './Hello';

test('Hello Test', (t: test.Test) : void => {
  t.equal(typeof Hello, 'function', 'Check if Hello is a function');

  const compiler = 'TypeScript';
  const framework = 'React';

  const test = <Hello compiler={compiler} framework={framework} />;
  t.deepEqual(test.props, { compiler: compiler, framework: framework }, 'Check is Hello returns correctly');

  const renderer = createRenderer();
  renderer.render(<Hello compiler={compiler} framework={framework} />);
  const result = renderer.getRenderOutput();
  t.equal(result.type, 'div', 'Check Hello returns div');

  t.end();
});

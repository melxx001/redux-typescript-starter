import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import {Hello} from '../components/Hello';
import {Layout} from '../layout';
import {About} from '../views/about';
import {Home} from '../views';
import {NotFound} from '../views/404';

const Component = (compiler: string, framework: string) => {
  return <Hello compiler={compiler} framework={framework} />;
};

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />

    <Route path="/about" component={About} />
    <Route path="/hello" component={Component.bind(this, 'TypeScript', 'React')} />

    <Route path="*" component={NotFound} />
  </Route>
);

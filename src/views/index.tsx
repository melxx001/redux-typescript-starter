import * as React from 'react';
import {Counter} from '../components/Counter';
export class Home extends React.Component<any, any> {
  render() {
    return (
      <div>
        <h1>Index</h1>
        <Counter />
      </div>
    );
  }
}

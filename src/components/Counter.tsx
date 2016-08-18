import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from './actions/counter';

export interface CounterProps {
  counter?: number;
  increment?: Function;
  decrement?: Function;
}

export class Counter extends React.Component<CounterProps, any>  {
  static propTypes = {
    counter: React.PropTypes.number,
    increment: React.PropTypes.func,
    decrement: React.PropTypes.func,
  };

  render() {
    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <div>
          <button ref="increment" onClick={this.props.increment}>Increment</button>
          <button ref="decrement" onClick={this.props.decrement}>Decrement</button>
        </div>
      </div>
    );
  }
}

export const getActions = (actions: any) : any => {
  const obj: any = {};
  const filter: any = Object.keys(actions).filter(a => (typeof actions[a] === 'function'));

  filter.forEach((item: any) => {
    obj[item] = actions[item];
  });

  return obj;
};

export const mapStateToProps = (state: any) => ({
  counter: state.counterReducer
});

export const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(getActions(Actions), dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter as any);


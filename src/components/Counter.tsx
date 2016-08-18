import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from './actions/counter';

export interface CounterProps {
  counter: number;
  increment: Function;
  decrement: Function;
}

export class CounterComponent extends React.Component<CounterProps, any>  {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
    decrement: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <h2>Counter: {this.props.counter}</h2>
        <div>
          <button onClick={this.props.increment}>Increment</button>
          <button onClick={this.props.decrement}>Decrement</button>
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

const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponent as any);

export {
  Counter
};

import {DECREMENT, INCREMENT, Actions} from '../actions/counter';

export function counterReducer(state: number = 0, action: Actions = { type: '' }) {
  switch (action.type) {
    case DECREMENT:
      return state - 1;
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

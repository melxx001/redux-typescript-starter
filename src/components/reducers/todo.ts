import {ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO} from '../actions/todo';

export interface State extends Object {
  id?: number;
  text?: string;
  completed?: Boolean;
}

export const todo = (state: State = {}, action: any = { type: '' }) : State => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

export const todoReducer = (state: Array<any> = [], action: any = { type: '' }) : Array<any> => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];
    case TOGGLE_TODO:
      return state.map((t: any) : any => todo(t, action));
    default:
      return state;
  }
};

export const visibilityFilterReducer = (state: string = 'SHOW_ALL', action: any = { type: '' }) : string => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

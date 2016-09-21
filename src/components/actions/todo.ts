let nextTodoId = 0;

export const ADD_TODO = 'ADD_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (text: string) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
  };
};

export const setVisibilityFilter = (filter: string) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
};

export const toggleTodo = (id: Number) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};


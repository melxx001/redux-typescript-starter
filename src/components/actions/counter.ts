export const DECREMENT = 'DECREMENT';
export const INCREMENT = 'INCREMENT';

export interface Actions extends Object {
  type: string;
}

export function decrement() : Actions {
  return {
    type: DECREMENT,
  };
}

export function increment() : Actions {
  return {
    type: INCREMENT,
  };
}


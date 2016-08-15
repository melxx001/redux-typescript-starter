export const DECREMENT = 'DECREMENT';
export const INCREMENT = 'INCREMENT';

interface Actions {
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


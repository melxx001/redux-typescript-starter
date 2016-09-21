import * as test from 'tape';
import {addTodo, setVisibilityFilter, toggleTodo} from '../actions/todo';
import {todoReducer, todo, visibilityFilterReducer} from './todo';

test('Todo Reducer Test', (t: test.Test) : void => {
  let init = addTodo('item 1');

  t.deepEqual(todo({}, init), { id: init.id++, text: 'item 1', completed: false }, 'Test addTodo 1');
  t.deepEqual(todo({}, addTodo('item 2')), { id: init.id++, text: 'item 2', completed: false }, 'Test addTodo 2');
  t.deepEqual(todo({}, addTodo('item 3')), { id: init.id++, text: 'item 3', completed: false }, 'Test addTodo 3');
  t.deepEqual(todo(null, addTodo('item 4')), { id: init.id++, text: 'item 4', completed: false }, 'Test addTodo 4');

  t.deepEqual(todo({id: 0}), {id: 0}, 'Test addTodo 5');

  t.deepEqual(todo({ id: 1 }, toggleTodo(1)), { id: 1, completed: true }, 'Test toggleTodo 1');
  t.deepEqual(todo({ id: 0 }, toggleTodo(1)), { id: 0 }, 'Test toggleTodo 2');
  t.deepEqual(todo({}, toggleTodo(1)), {}, 'Test toggleTodo 3');
  t.deepEqual(todo(undefined, toggleTodo(1)), {}, 'Test toggleTodo 4');

  t.deepEqual(
    todoReducer([], addTodo('item 5')),
    [{ id: init.id++, text: 'item 5', completed: false }],
    'Test addTodo todoReducer 1'
  );

  t.deepEqual(todoReducer(
    [{ id: 4, text: 'item 5', completed: false }], addTodo('item 5')),
    [{ completed: false, id: 4, text: 'item 5' }, { completed: false, id: init.id++, text: 'item 5' }],
    'Test addTodo todoReducer 2'
  );

  t.deepEqual(todoReducer(
    [{ id: 1 }, { id: 0 }], toggleTodo(1)),
    [{ completed: true, id: 1 }, { id: 0 }],
    'Test toggle todoReducer 1'
  );

  t.deepEqual(todoReducer(),
    [],
    'Test default todoReducer 1'
  );

  t.deepEqual(todoReducer([{ id: 1 }, { id: 0 } ]),
    [{ id: 1 }, { id: 0 } ],
    'Test default todoReducer 2'
  );

  t.deepEqual(
    visibilityFilterReducer(null, setVisibilityFilter('SHOW')),
    'SHOW',
    'Test visibilityFilter 1'
  );

  t.deepEqual(
    visibilityFilterReducer(),
    'SHOW_ALL',
    'Test visibilityFilter 2'
  );

  t.end();
});

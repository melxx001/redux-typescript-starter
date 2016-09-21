import * as test from 'tape';
import * as todo from './todo';

test('Todo Actions Test', (t: test.Test) : void => {
  let addTodo = todo.addTodo('item 1');
  t.equal(addTodo.id,  0, 'Test addTodo 1');
  addTodo = todo.addTodo('item 2');
  t.equal(addTodo.id,  1, 'Test addTodo 2');
  addTodo = todo.addTodo('item 3');
  t.equal(addTodo.id,  2, 'Test addTodo 3');

  const setVisibilityFilter = todo.setVisibilityFilter('hide');
  t.deepEqual(setVisibilityFilter, {type: todo.SET_VISIBILITY_FILTER, filter: 'hide'}, 'Test setVisibilityFilter');

  const toggleTodo = todo.toggleTodo(10);
  t.deepEqual(toggleTodo, {type: todo.TOGGLE_TODO, id: 10}, 'Test toggleTodo');

  t.end();
});

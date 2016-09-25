import * as React from 'react';
import * as test from 'tape';
import { createRenderer, Simulate } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import configureStore from '../store';
import {mount} from 'enzyme';

import {
  LinkComponent, Todo, TodoList, Footer, AddTodoComponent,
  AddTodo, VisibleTodoList,
  filterLinkMapDispatchToProps, getVisibleTodos,
  ToDoApp
} from './Todo';

test('Todo Presentation Tests', (t: test.Test) : void => {
  let onClick = () => {};
  let onClick2 = (id: number) => {
    return () => id + 1;
  };
  let renderer: any;
  let result: any;

  let test = <LinkComponent active={true} onClick={onClick}>Test</LinkComponent>;
  t.deepEqual(test.props, { active: true, onClick: onClick, children: 'Test' }, 'Check LinkComponent props');
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'span', 'Check LinkComponent tag 1');

  test = <LinkComponent active={false} onClick={onClick}>{''}</LinkComponent>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'a', 'Check LinkComponent tag 2');
  t.equal(result.props.children, '', 'Check LinkComponent props children');
  t.equal(typeof result.props.onClick, 'function', 'Check LinkComponent props onclick');

  test = <Todo onClick={onClick} completed={false} text="Active"/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'li', 'Check Todo tag');
  t.deepEqual(result.props.style, { textDecoration: 'none' }, 'Check Todo props style 1');
  t.equal(result.props.children, 'Active', 'Check Todo props children');
  t.equal(result.props.onClick, onClick, 'Check Todo props onClick');

  test = <Todo onClick={onClick} completed={true} text="Active"/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.deepEqual(result.props.style, { textDecoration: 'line-through' }, 'Check Todo props style 2');

  let todoArr = [{ id: 0, completed: false, text: 'Test' }];
  test = <TodoList todos={todoArr} onTodoClick={onClick2.bind(this)}/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'ul', 'Check TodoList tag');
  t.true(Array.isArray(result.props.children), 'Check TodoList props children array');

  test = <Footer/>;
  renderer = createRenderer();
  renderer.render(test);
  result = renderer.getRenderOutput();
  t.equal(result.type, 'p', 'Check Footer tag');

  t.end();
});

test('Todo Container Tests', (t: test.Test) : void => {
  const store = configureStore();

  // AddTodo container tests
  const addTodoWrapper = mount(
    <Provider store={store} key="provider">
      <AddTodo />
    </Provider>
  );
  const addTodo: any = addTodoWrapper.find(AddTodo);
  const addTodoComponent: any = addTodo.find(AddTodoComponent);
  t.equal(addTodoComponent.text(), addTodo.text(), 'Check AddTodo text');

  // FilterLink filterLinkMapDispatchToProps function tests
  const filterlink = filterLinkMapDispatchToProps(() => { return 'dispatch'; }, 'SHOW_ALL');
  t.true(filterlink.hasOwnProperty('onClick'), 'Check if filterLink\'s MapDispatchToProps returns onClick');
  t.equal(filterlink.onClick(), 'dispatch', 'Check filterLink\'s MapDispatchToProps function');

  // getVisibleTodos helper function tests
  const todosArray = [
    { text: 'item1', completed: true },
    { text: 'item2', completed: false },
    { text: 'item3', completed: true },
  ];
  const showAll = getVisibleTodos(todosArray, 'SHOW_ALL');
  const showCompleted = getVisibleTodos(todosArray, 'SHOW_COMPLETED');
  const showActive = getVisibleTodos(todosArray, 'SHOW_ACTIVE');

  t.deepEqual(getVisibleTodos(todosArray), showAll, 'Check getVisibleTodos default filter');
  t.equal(showAll.length, 3, 'Check getVisibleTodos SHOW_ALL filter 1');
  t.equal(showAll[2].text, 'item3', 'Check getVisibleTodos SHOW_ALL filter 2');

  t.equal(showCompleted.length, 2, 'Check getVisibleTodos SHOW_COMPLETED filter 1');
  t.equal(showCompleted[1].text, 'item3', 'Check getVisibleTodos SHOW_COMPLETED filter 2');

  t.equal(showActive.length, 1, 'Check getVisibleTodos SHOW_ACTIVE filter 1');
  t.equal(showActive[0].text, 'item2', 'Check getVisibleTodos SHOW_ACTIVE filter 2');

  // VisibleTodoList container tests
  const visibleTodoListWrapper = mount(
    <Provider store={store} key="provider">
      <VisibleTodoList />
    </Provider>
  );
  const visibleTodoList: any = visibleTodoListWrapper.find(VisibleTodoList);
  const todoList: any = visibleTodoList.find(TodoList);
  t.equal(visibleTodoList.text(), todoList.text(), 'Check visibleTodoList text');


  // Full app unit tests
  const provider =
    <Provider store={store} key="provider">
      <ToDoApp />
    </Provider>;

  const toDoAppWrapper = mount(provider);
  const toDoApp: any = toDoAppWrapper.find(ToDoApp);
  const input = toDoApp.find('input').get(0);
  const form = toDoApp.find('form');
  let list: any = toDoApp.find('ul').find('li');
  t.equal(list.length, 0 , 'Check empty number of to do items');

  // Add items
  input.value = '';
  form.simulate('submit');

  input.value = 'item 1';
  form.simulate('submit');

  input.value = 'item 2';
  form.simulate('submit');

  list = toDoApp.find('ul').find('li');
  t.equal(list.length, 2 , 'Check number of to do items added');
  t.equal(list.get(0).textContent, 'item 1' , 'Check value of item 1');
  t.equal(list.get(1).textContent, 'item 2' , 'Check value of item 2');
  t.notEqual(
    list.get(1).getAttribute('style').indexOf('text-decoration: none;'),
    -1,
    'Check if initial item has no text decoration'
  );

  // click on an item to strike them
  Simulate.click(list.get(1));
  t.notEqual(
    list.get(1).getAttribute('style').indexOf('text-decoration: line-through;'),
    -1,
    'Check if clicked item has text decoration'
  );

  t.end();
});

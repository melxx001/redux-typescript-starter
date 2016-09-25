import * as React from 'react';
import {connect} from 'react-redux';
import {addTodo, setVisibilityFilter, toggleTodo} from './actions/todo';
import {TodoState} from './reducers/todo';
import {ReducerState} from '../rootReducer';

// Setup the presentation link component which will display the links
// needed to manipulate what to show.
export interface LinkProps extends Object {
  active: Boolean;
  children?: Node;
  onClick: Function;
}
export class LinkComponent extends React.Component<LinkProps, any> {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func.isRequired,
  };

  render() {
    if (this.props.active) {
      return (
        <span>{this.props.children}</span>
      );
    }

    return (
      <a href="#" onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  }
}

// Setup the presentation to do component which displays a to do item
export interface TodoProps extends Object {
  onClick: Function;
  completed: Boolean;
  text: string;
}
export class Todo extends React.Component<TodoProps, any> {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    completed: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <li
        onClick={this.props.onClick}
        style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}
      >
        {this.props.text}
      </li>
    );
  }
}

// Setup the presentation to do list component which will display a
// bulleted list of the added items
export interface TodoListProps extends Object {
  todos: Array<TodoState>;
  onTodoClick: Function;
}
export class TodoList extends React.Component<TodoListProps, any> {
  static propTypes = {
    todos: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      completed: React.PropTypes.bool.isRequired,
      text: React.PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ul>
        {this.props.todos.map((todo: TodoState) =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => this.props.onTodoClick(todo.id)}
            ref={'todo_' + todo.id}
          />
        )}
      </ul>
    );
  }
}

// Setup the presentation component to display the various links
export class Footer extends React.Component<any, any>  {
  render() {
    return (
      <p>
        Show: {' '}
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
      </p>
    );
  }
}

// Setup the container component for the input form to add an item
export interface AddTodoProps extends Object {
  dispatch: Function;
}
export class AddTodoComponent extends React.Component<AddTodoProps, any> {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  render() {
    let input: HTMLInputElement;
    return (
      <div>
        <form onSubmit={(e: Event) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          this.props.dispatch(addTodo(input.value));
          input.value = '';
        }}>
          <input ref={(node: HTMLInputElement) => {input = node;}} />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
export const AddTodo = connect()(AddTodoComponent as any);

// Setup the container component to update the links based on a filter
export const filterLinkMapStateToProps = (state: ReducerState, ownProps: any) => {
  return {
    active: ownProps.filter === state.visibilityFilterReducer
  };
};

export const filterLinkMapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    onClick: () => {
      return dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

export const FilterLink = connect(
  filterLinkMapStateToProps,
  filterLinkMapDispatchToProps
)(LinkComponent as any);

// Setup the container component to decide what items to show based on what was link was clicked
export const getVisibleTodos = (todos: any , filter: string = '') => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t: any) : Boolean => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t: any) : Boolean => !t.completed);
    default:
      return todos;
  }
};

export const VisibleTodoList = connect(
  (state: ReducerState) => {
    return {
      todos: getVisibleTodos(state.todoReducer, state.visibilityFilterReducer)
    };
  },
  (dispatch: Function) => {
    return {
      onTodoClick: (id: number) => {
        dispatch(toggleTodo(id));
      }
    };
  }
)(TodoList as any);

// Export the Full App
export const ToDoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


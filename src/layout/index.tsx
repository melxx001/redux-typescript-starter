import * as React from 'react';
import { Link } from 'react-router';

export function Layout(props: React.Props<any>) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/hello">Hello</Link>
        </li>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
      <div>
        {props.children}
      </div>
    </div>
  );
};

import * as React from 'react';
import { Link } from 'react-router';

export default function Layout(props: React.Props<any>) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div>
        {props.children}
      </div>
    </div>
  );
};

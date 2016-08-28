import * as React from 'react';

import { renderToString } from 'react-dom/server';

export function Html(props: any) {
  const {
    component,
    script,
    state
  } = props;

  const content = component ? renderToString(component) : '';

  return (
    <html className = "no-js" lang = "en">
    <head>
      <meta charSet = "utf-8" />
      <meta httpEquiv = " x-ua-compatible" content = "ie=edge" />
      <title>Add Universal</title>
      <meta name ="description" content ="Get started with React, React Router, Redux, and Universal." />
      <meta name ="viewport" content ="width=device-width, initial-scale=1" />

      <link rel ="apple-touch-icon" href ="apple-touch-icon.png" />
      <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
    </head>

    <body>
      <div id="example" dangerouslySetInnerHTML={{ __html: content }} />

      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(state)};` }} />
      <script src={script} />
    </body>
    </html>
);
}

export default Html;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* Commenting out strict mode as few Material UI componnets uses ReactDom.findDomNode which is not allowed in
    strict Mode */

ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();

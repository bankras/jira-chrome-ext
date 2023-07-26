import React from 'react';
import ReactDOM from 'react-dom/client';
import Config from './Config';

const root = document.createElement("div")
root.className="container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <Config />
  </React.StrictMode>
);


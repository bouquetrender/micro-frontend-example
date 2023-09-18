import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

let root;

function render(props = {}) {
  const { container, publicPath } = props;

  // eslint-disable-next-line
  publicPath && (__webpack_public_path__ = publicPath);

  root = createRoot(container || document.querySelector('#root'));
  root.render(<App />);
}

if (!window.__POWER_BY_MICRO_APP__) {
  render();
}

export function mount(props) {
  render(props);
  console.log('react app mounted');
}

export function unmount() {
  if (root) {
    root.unmount();
    console.log('react app unmount');
  }
}
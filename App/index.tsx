import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Core
import 'design/core';
import { Masks } from 'design/icons';

// App
import { App } from '@/app';

(() => {
  const appRoot = document.querySelector('app-root');

  if (!appRoot) {
    return;
  }

  const root = ReactDOM.createRoot(appRoot);

  root.render(
    <StrictMode>
      <Masks />
      <App />
    </StrictMode>
  );
})();

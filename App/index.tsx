import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Core
import '@/Core';

// App
import App from '@/App';

// Sentry
import * as Analytic from '@/Analytic';

(() => {
  Analytic.init();

  const appRoot = document.querySelector('app-root');

  if (!appRoot) {
    return;
  }

  const root = ReactDOM.createRoot(appRoot);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();

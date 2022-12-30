import React from 'react';
import ReactDOM from 'react-dom/client';

// Core
import '@/Core';

// App
import App from '@/App';

(() => {
  const appRoot = document.querySelector('app-root');

  if (!appRoot) {
    return;
  }

  const root = ReactDOM.createRoot(appRoot);

  root.render(<App />);
})();

export default {};

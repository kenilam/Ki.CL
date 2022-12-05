import ReactDOM from 'react-dom/client';

// Core
import '@/Core';

(() => {
  const appRoot = document.querySelector('app-root');

  if (!appRoot) {
    return;
  }

  const root = ReactDOM.createRoot(appRoot);

  root.render('hello world');
})();

export default {};

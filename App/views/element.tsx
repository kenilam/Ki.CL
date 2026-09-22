import React, { useEffect } from 'react';

// Routes
import { useLocation } from '@/router';

// Widgets
import { GlobalHeaderProvider } from '@/widgets';

// Hooks
import { useResponsive } from '@/hooks';

// Partials
import { Contents } from './contents';

const Element: React.FunctionComponent = () => {
  useResponsive();

  const location = useLocation();

  useEffect(() => {
    const root = document.querySelector('body');

    if (!root) {
      return;
    }

    const routes = (location.pathname.replace('/', '') || 'home').split('/');

    root.dataset.routes = routes.join('.');

    document.title = `Ki.CL | ${routes.join(' | ')}`;
  });

  return (
    <GlobalHeaderProvider show={false}>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export { Element };

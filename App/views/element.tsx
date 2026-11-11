import React from 'react';

// Widgets
import { GlobalHeaderProvider } from 'design/widgets';

// Hooks
import { useRouteChange } from './use-route-change';

// Partials
import { Contents } from './contents';

const Element: React.FunctionComponent = () => {
  useRouteChange();

  return (
    <GlobalHeaderProvider>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export { Element };

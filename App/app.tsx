import React from 'react';

// Env
import { EnvProvider } from '@/env/client';

// Partials
import { Contents } from './contents';

const App: React.FunctionComponent = () => {
  return (
    <EnvProvider>
      <Contents />
    </EnvProvider>
  );
};

export { App };

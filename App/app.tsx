import React, { Suspense, lazy } from 'react';

// Env
import { EnvProvider, useEnvContext } from '@/env/client';

// LocalStorage
import { LocalStorageProvider } from '@/local-storage';

// Components
import { Spinner } from '@/components';

// View
import { Views as View } from '@/views';

const KiclProvider = lazy(() =>
  import('api/provider').then(({ KiclProvider }) => ({ default: KiclProvider }))
);

const Contents: React.FunctionComponent = () => {
  const { loading } = useEnvContext();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {/* Sessions start in `@/session`, on the routes that need one. */}
      <KiclProvider autoExchange={false}>
        <LocalStorageProvider>
          <View />
        </LocalStorageProvider>
      </KiclProvider>
    </Suspense>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <EnvProvider>
      <Contents />
    </EnvProvider>
  );
};

export { App };

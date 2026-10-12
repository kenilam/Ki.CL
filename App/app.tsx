import React, { Suspense, lazy } from 'react';

// I18n
import { ready } from '@/i18n';

// Env
import { EnvProvider, useEnvContext } from '@/env/client';

// LocalStorage
import { LocalStorageProvider } from '@/local-storage';

// Components
import { Spinner } from 'design/components';

// View
import { Views as View } from '@/views';

const KiclProvider = lazy(async () => {
  // The words outside any route load under the same spinner as the provider.
  const [{ KiclProvider }] = await Promise.all([import('api/provider'), ready]);

  return { default: KiclProvider };
});

const Contents: React.FunctionComponent = () => {
  const { loading } = useEnvContext();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {/* The session starts in `@/session`, at the root route. */}
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

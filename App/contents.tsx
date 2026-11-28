import React, { Suspense, lazy } from 'react';

// I18n
import { ready } from '@/language';

// Env
import { useEnvContext } from '@/env/client';

// LocalStorage
import { LocalStorageProvider } from '@/local-storage';

// Components
import { Spinner } from 'design/components';

// View
import { Views as View } from '@/views';

const Provider = lazy(async () => {
  // The words outside any route load under the same spinner as the provider.
  const [{ Provider }] = await Promise.all([import('api/client'), ready()]);

  return { default: Provider };
});

const Contents: React.FunctionComponent = () => {
  const { loading } = useEnvContext();

  if (loading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {/* The session starts in `@/session`, at the root route. */}
      <Provider>
        <LocalStorageProvider>
          <View />
        </LocalStorageProvider>
      </Provider>
    </Suspense>
  );
};

export { Contents };

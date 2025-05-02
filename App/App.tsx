import React from 'react';

// Env
import { EnvProvider, useEnvContext } from '@/Env/Client';

// LocalStorage
import LocalStorageProvider from '@/LocalStorage';

// Components
import { Spinner } from '@/Components';

// View
import View from '@/Views';

const Contents: React.FunctionComponent = () => {
  const { loading } = useEnvContext();

  if (loading) {
    return <Spinner />;
  }

  return (
    <LocalStorageProvider>
      <View />
    </LocalStorageProvider>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <EnvProvider>
      <Contents />
    </EnvProvider>
  );
};

export default App;

import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Composer } from '@/views/experiments/image-agent/composer';

// Hooks
import { useRunning } from './use-running';
import { useStart } from './use-start';

const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const sender = useStart();
  const busy = useRunning();

  return (
    <Composer
      busy={busy}
      error={sender.error}
      loading={sender.loading}
      send={sender.send}
    >
      {children}
    </Composer>
  );
};

export { Provider };

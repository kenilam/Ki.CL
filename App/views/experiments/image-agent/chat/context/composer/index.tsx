import React, { PropsWithChildren } from 'react';

// Partials
import { Provider as Composer } from '@/views/experiments/image-agent/composer';

// Context
import { useBusyContext } from '@/views/experiments/image-agent/chat/context/busy';
import { useSenderContext } from '@/views/experiments/image-agent/chat/context/sender';

/** The message field, which sends into this conversation. */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const busy = useBusyContext();
  const { error, loading, send } = useSenderContext();

  return (
    <Composer busy={busy} error={error} loading={loading} send={send}>
      {children}
    </Composer>
  );
};

export { Provider };

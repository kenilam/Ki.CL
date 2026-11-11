import React from 'react';

// Components
import { List } from 'design/components';

// Hooks
import { usePast } from '@/views/experiments/image-agent/start/page/hero/past/use-past';

// Partials
import { Thread } from './thread';

const Threads: React.FunctionComponent = () => {
  const { threads } = usePast();

  return (
    <List gap='narrow'>
      {threads.map(({ id }) => {
        return <Thread id={id} key={id} />;
      })}
    </List>
  );
};

export { Threads };

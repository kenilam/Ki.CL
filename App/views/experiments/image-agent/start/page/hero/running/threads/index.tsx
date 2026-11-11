import React from 'react';

// API
import { Kicl_ImageAgentAllowanceDocument, useQuery } from 'api/provider';

// Components
import { List } from 'design/components';

// Partials
import { Thread } from './thread';

const Threads: React.FunctionComponent = () => {
  const { data } = useQuery(Kicl_ImageAgentAllowanceDocument);

  return (
    <List gap='narrow'>
      {data?.imageAgentAllowance.running.map(({ id }) => {
        return <Thread id={id} key={id} />;
      })}
    </List>
  );
};

export { Threads };

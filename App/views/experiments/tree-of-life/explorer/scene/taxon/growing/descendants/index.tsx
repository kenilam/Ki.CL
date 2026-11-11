import React from 'react';

// Partials
import { Taxon } from '@/views/experiments/tree-of-life/explorer/scene/taxon';

// Hooks
import { useDescendants } from './use-descendants';

const Descendants: React.FunctionComponent = () => {
  const mounting = useDescendants();

  return (
    <>
      {mounting.map(({ nodeId }) => {
        return <Taxon key={nodeId} nodeId={nodeId} />;
      })}
    </>
  );
};

export { Descendants };

import React from 'react';

// Context
import { useTaxonVisualContext } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/context';

// Partials
import { Announcement } from './announcement';
import { Pick } from './pick';
import { Plate } from './plate';

const Panel: React.FunctionComponent = () => {
  const { eligible, node } = useTaxonVisualContext();

  if (!node) {
    return null;
  }

  if (!eligible) {
    return <Pick />;
  }

  return (
    <>
      <Announcement />
      <Plate />
    </>
  );
};

export { Panel };

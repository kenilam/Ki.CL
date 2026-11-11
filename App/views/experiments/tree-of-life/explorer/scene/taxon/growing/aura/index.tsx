import React from 'react';

// Context
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

// Hooks
import { useVariant } from './use-variant';

// Partials
import { Pulse } from './pulse';

const Aura: React.FunctionComponent = () => {
  const { refs } = useTaxonContext();
  const variant = useVariant();

  if (!variant) {
    return null;
  }

  return (
    <group ref={refs.aura}>
      <Pulse />
    </group>
  );
};

export { Aura };

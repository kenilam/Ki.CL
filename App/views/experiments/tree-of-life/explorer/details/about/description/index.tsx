import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTaxon } from '@/views/experiments/tree-of-life/explorer/details/use-taxon';

const Description: React.FunctionComponent = () => {
  const taxon = useTaxon();
  const description = taxon?.description?.trim();

  if (!description) {
    return null;
  }

  return (
    <Text dense is='p' className='kicl-color-grey-700'>
      {description}
    </Text>
  );
};

export { Description };

import React from 'react';

// Components
import { Heading, Skeleton } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

const Name: React.FunctionComponent = () => {
  const swatch = useCard();

  if (swatch?.name) {
    return (
      <Heading dense is='h1' lookLike='h2'>
        {swatch.name}
      </Heading>
    );
  }

  return swatch === null ? null : <Skeleton className='kicl-inline-size-md' />;
};

export { Name };

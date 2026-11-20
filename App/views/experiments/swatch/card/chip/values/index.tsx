import React from 'react';

// Components
import { Layout } from 'design/components';

// Hooks
import { useCard } from '@/views/experiments/swatch/use-card';

// Partials
import { Value } from './value';

// Constants
import { TERMS } from './constants';

const Values: React.FunctionComponent = () => {
  const swatch = useCard();

  if (swatch === null) {
    return null;
  }

  return (
    <Layout columns gap='narrowest'>
      <dl>
        {TERMS.map((term) => {
          return <Value key={term} term={term} />;
        })}
      </dl>
    </Layout>
  );
};

export { Values };

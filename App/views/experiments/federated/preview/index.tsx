import React, { Suspense } from 'react';

import * as federated from '@/views/experiments/federated/load';

const previews = new Map<string, React.LazyExoticComponent<React.FunctionComponent>>();

type Props = { name: string };

const Preview: React.FunctionComponent<Props> = ({ name }) => {
  if (!previews.has(name)) {
    previews.set(
      name,
      React.lazy(async () => {
        try {
          const { Preview: Art } = await federated.load<{ Preview: React.FunctionComponent }>({ name, module: 'preview' });

          return { default: Art };
        } catch (error) {
          // The card still shows, without its art.
          console.warn(error);
          return { default: () => null };
        }
      })
    );
  }

  const Art = previews.get(name) as React.LazyExoticComponent<React.FunctionComponent>;

  return (
    <Suspense fallback={null}>
      <Art />
    </Suspense>
  );
};

export { Preview };

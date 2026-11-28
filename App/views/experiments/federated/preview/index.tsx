import React, { Suspense } from 'react';

import { loadFederated } from '@/views/experiments/federated/load';

const previews = new Map<string, React.LazyExoticComponent<React.FunctionComponent>>();

type Props = { name: string };

/** An experiment's own art for this page and the home page, from its remote's `./preview`. */
const Preview: React.FunctionComponent<Props> = ({ name }) => {
  if (!previews.has(name)) {
    previews.set(
      name,
      React.lazy(async () => {
        try {
          const { Preview: Art } = await loadFederated<{ Preview: React.FunctionComponent }>({ name, module: 'preview' });

          return { default: Art };
        } catch (error) {
          // The card still shows without its art when the experiment can't be reached.
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

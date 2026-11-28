import React, { Suspense } from 'react';

// Routes
import { Route, useParams } from 'design/router';

// Components
import { Spinner } from 'design/components';
import { ErrorElement } from 'design/status';

import { loadFederated } from './load';

const pages = new Map<string, React.LazyExoticComponent<React.FunctionComponent>>();

/** The experiment's own page, kept per name so a visit back doesn't load it again. */
const Page: React.FunctionComponent = () => {
  const { name = '' } = useParams();

  if (!pages.has(name)) {
    pages.set(
      name,
      React.lazy(async () => {
        const { Experiment } = await loadFederated<{ Experiment: React.FunctionComponent }>({ name, module: 'client' });

        return { default: Experiment };
      })
    );
  }

  const Experiment = pages.get(name) as React.LazyExoticComponent<React.FunctionComponent>;

  return (
    <Suspense fallback={<Spinner />}>
      <Experiment />
    </Suspense>
  );
};

// After the experiments the host still has, so theirs win. One that fails to load fails only its own page.
const Federated = <Route path=':name/*' element={<Page />} errorElement={<ErrorElement />} />;

export { Federated };

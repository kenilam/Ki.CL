import React, { Suspense } from 'react';

// Routes
import { Route, useParams } from 'design/router';

// Components
import { Spinner } from 'design/components';
import { ErrorElement } from 'design/status';

import * as federated from './load';

const pages = new Map<string, React.LazyExoticComponent<React.FunctionComponent>>();

const Page: React.FunctionComponent = () => {
  const { name = '' } = useParams();

  if (!pages.has(name)) {
    pages.set(
      name,
      React.lazy(async () => {
        const { Experiment } = await federated.load<{ Experiment: React.FunctionComponent }>({ name, module: 'client' });

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

// After the host's own experiments, which win; one that fails to load fails only its page.
const Federated = <Route path=':name/*' element={<Page />} errorElement={<ErrorElement />} />;

export { Federated };

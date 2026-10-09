import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Resume } = await import('./contents');

  return { default: Resume };
});

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

/** The master at the path itself, a tailored version at its own segment. */
const Resume = <Route path={`${PATH}/:version?`} element={<Lazy />} />;

export { PATH, Resume };

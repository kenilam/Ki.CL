import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Partials
import { Gate } from './gate';

// Constants
import { PATH } from './constants';
import { CONFIRM_PATH, PATH as PASSWORD_PATH } from './password/constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Me }) => ({ default: Me }))
);
const Profile = React.lazy(() =>
  import('./profile').then(({ Profile }) => ({ default: Profile }))
);
const Password = React.lazy(() =>
  import('./password').then(({ Password }) => ({ default: Password }))
);
const Confirm = React.lazy(() =>
  import('./password/confirm').then(({ Confirm }) => ({ default: Confirm }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Me = (
  <Route path={PATH} element={<Lazy />}>
    <Route element={<Gate />}>
      <Route index element={<Profile />} />
      <Route path={PASSWORD_PATH} element={<Password />} />
    </Route>
    {/* Outside the gate: the emailed link is often opened on another device. */}
    <Route path={`${PASSWORD_PATH}/${CONFIRM_PATH}`} element={<Confirm />} />
  </Route>
);

export { PATH, Me };

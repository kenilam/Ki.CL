import React from 'react';

// Routes
import { Navigate, Route, useParams } from 'design/router';

// Constants
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { PATH } from './constants';

const Redirect: React.FunctionComponent = () => {
  const { '*': rest = '' } = useParams();

  return <Navigate replace to={`/${WORKSHOP_PATH}/${PATH}/${rest}`} />;
};

// The docs used to be at the root. Remove a release after links have moved.
const DesignSystemRedirect = (
  <Route path={`${PATH}/*`} element={<Redirect />} />
);

export { DesignSystemRedirect };

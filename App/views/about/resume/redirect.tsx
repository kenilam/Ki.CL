import React from 'react';

import { Navigate, Route, useParams } from 'design/router';

import { PATH as ABOUT } from '@/views/about/constants';
import { PATH } from './constants';

const Redirect: React.FunctionComponent = () => {
  const { '*': rest = '' } = useParams();

  return <Navigate replace to={`/${ABOUT}/${PATH}/${rest}`} />;
};

const ResumeRedirect = <Route path={`${PATH}/*`} element={<Redirect />} />;

export { ResumeRedirect };

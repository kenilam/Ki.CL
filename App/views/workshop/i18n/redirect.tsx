import React from 'react';

// Routes
import { Navigate, Route } from 'design/router';

// Constants
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { PATH } from './constants';

const I18nRedirect = (
  <Route
    path='internationalisation'
    element={<Navigate replace to={`/${WORKSHOP_PATH}/${PATH}`} />}
  />
);

export { I18nRedirect };

import React from 'react';

// Components
import { HyperLink } from '@/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';
import { PATH as HOME_PATH } from '@/views/home';

export const Links = [
  <HyperLink
    className='kicl-font-size-medium'
    key={HOME_PATH}
    to={`/${HOME_PATH}`}
  >
    Home
  </HyperLink>,
  <HyperLink
    className='kicl-font-size-medium'
    key={EXPERIMENTS_PATH}
    to={`/${EXPERIMENTS_PATH}`}
  >
    Experiments
  </HyperLink>,
];

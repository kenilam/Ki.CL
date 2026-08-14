import React from 'react';

// Components
import { HyperLink } from '@/Components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/Views/Experiments';
import { PATH as HOME_PATH } from '@/Views/Home';

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

import React from 'react';

// Components
import { Animation, HyperLink, List, ListItem } from '@/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';
import { EXPERIMENTS } from '@/views/experiments/home/constants';
import { PATH as HOME_PATH } from '@/views/home';

export const Links = [
  <HyperLink
    className='kicl-font-size-medium'
    key={HOME_PATH}
    to={`/${HOME_PATH}`}
  >
    Home
  </HyperLink>,
  <React.Fragment key={EXPERIMENTS_PATH}>
    <HyperLink className='kicl-font-size-medium' to={`/${EXPERIMENTS_PATH}`}>
      Experiments
    </HyperLink>
    <List gap='narrow' justifyItems='end'>
      {EXPERIMENTS.map(({ title, to }) => (
        <Animation duration='faster' key={to} property='slide-from-top'>
          <ListItem>
            <HyperLink to={to}>{title}</HyperLink>
          </ListItem>
        </Animation>
      ))}
    </List>
  </React.Fragment>,
];

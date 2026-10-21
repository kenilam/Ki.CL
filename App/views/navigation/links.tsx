import React from 'react';

// Libraries
import { Trans } from 'react-i18next';

// Components
import { Animation, HyperLink, List, ListItem } from 'design/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';
import { EXPERIMENTS } from '@/views/experiments/home/constants';
import { PATH as HOME_PATH } from '@/views/home';
import { PATH as RESUME_PATH } from '@/views/resume/constants';
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { TOPICS } from '@/views/workshop/home/constants';

export const Links = [
  <HyperLink
    className='kicl-font-size-medium'
    key={HOME_PATH}
    to={`/${HOME_PATH}`}
  >
    <Trans i18nKey='home' />
  </HyperLink>,
  <React.Fragment key={EXPERIMENTS_PATH}>
    <HyperLink className='kicl-font-size-medium' to={`/${EXPERIMENTS_PATH}`}>
      <Trans i18nKey='experiments' />
    </HyperLink>
    <List gap='narrow' justifyItems='end'>
      {/* Newest first. */}
      {EXPERIMENTS.toReversed().map(({ context, to }) => (
        <Animation key={to} property='slide-from-top'>
          <ListItem>
            <HyperLink to={to}>
              <Trans context={context} i18nKey='experiment' />
            </HyperLink>
          </ListItem>
        </Animation>
      ))}
    </List>
  </React.Fragment>,
  <React.Fragment key={WORKSHOP_PATH}>
    <HyperLink className='kicl-font-size-medium' to={`/${WORKSHOP_PATH}`}>
      <Trans i18nKey='workshop' />
    </HyperLink>
    <List gap='narrow' justifyItems='end'>
      {TOPICS.map(({ context, to }) => (
        <Animation key={to} property='slide-from-top'>
          <ListItem>
            <HyperLink to={to}>
              <Trans i18nKey={context} />
            </HyperLink>
          </ListItem>
        </Animation>
      ))}
    </List>
  </React.Fragment>,
  <HyperLink
    className='kicl-font-size-medium'
    key={RESUME_PATH}
    to={`/${RESUME_PATH}`}
  >
    <Trans i18nKey='resume' />
  </HyperLink>,
];

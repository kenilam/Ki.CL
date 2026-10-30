import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Animation, HyperLink, List, ListItem } from 'design/components';

// Views
import { PATH as EXPERIMENTS_PATH } from '@/views/experiments';
import { EXPERIMENTS } from '@/views/experiments/home/constants';
import { PATH as HOME_PATH } from '@/views/home';
import { PATH as RESUME_PATH } from '@/views/resume/constants';
import { PATH as WORKSHOP_PATH } from '@/views/workshop/constants';
import { TOPICS } from '@/views/workshop/home/constants';

// Built on each render: elements kept in a constant are skipped when the language changes.
export const useLinks = () => {
  const { t } = useTranslation();

  return [
    <HyperLink
      className='kicl-font-size-medium'
      key={HOME_PATH}
      to={`/${HOME_PATH}`}
    >
      {t('home')}
    </HyperLink>,
    <React.Fragment key={EXPERIMENTS_PATH}>
      <HyperLink className='kicl-font-size-medium' to={`/${EXPERIMENTS_PATH}`}>
        {t('experiments')}
      </HyperLink>
      <List gap='narrow' justifyItems='end'>
        {/* Newest first. */}
        {EXPERIMENTS.toReversed().map(({ context, to }) => {
          return (
            <Animation key={to} property='slide-from-top'>
              <ListItem>
                <HyperLink to={to}>{t('experiment', { context })}</HyperLink>
              </ListItem>
            </Animation>
          );
        })}
      </List>
    </React.Fragment>,
    <React.Fragment key={WORKSHOP_PATH}>
      <HyperLink className='kicl-font-size-medium' to={`/${WORKSHOP_PATH}`}>
        {t('workshop')}
      </HyperLink>
      <List gap='narrow' justifyItems='end'>
        {TOPICS.map(({ context, to }) => {
          return (
            <Animation key={to} property='slide-from-top'>
              <ListItem>
                <HyperLink to={to}>{t(context)}</HyperLink>
              </ListItem>
            </Animation>
          );
        })}
      </List>
    </React.Fragment>,
    <HyperLink
      className='kicl-font-size-medium'
      key={RESUME_PATH}
      to={`/${RESUME_PATH}`}
    >
      {t('resume')}
    </HyperLink>,
  ];
};

import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Animation, HyperLink, List, ListItem } from 'design/components';

// Views
import { EXPERIMENTS, PAGES, TOPICS } from '@/views/routes';

// Built on each render: elements kept in a constant are skipped when the language changes.
export const useLinks = () => {
  const { t } = useTranslation();

  return [
    <HyperLink
      className='kicl-font-size-medium'
      key={PAGES.home}
      to={PAGES.home}
    >
      {t('home')}
    </HyperLink>,
    <React.Fragment key={PAGES.experiments}>
      <HyperLink className='kicl-font-size-medium' to={PAGES.experiments}>
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
    <React.Fragment key={PAGES.workshop}>
      <HyperLink className='kicl-font-size-medium' to={PAGES.workshop}>
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
      key={PAGES.resume}
      to={PAGES.resume}
    >
      {t('resume')}
    </HyperLink>,
  ];
};

import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, HyperLink, Navigation } from 'design/components';

// Constants
import { ROUTES } from '@/views/routes';

const Menu: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    home: useTranslation('home'),
  };

  return (
    <Animation
      delay={2000}
      duration='slower'
      easing='ease-sine-in'
      property='slide-from-bottom'
    >
      <Navigation
        aria-label={translations.home.t('header.menu.label')}
        className={classNames(
          'kicl-padding-block-start-wide',
          'kicl-z-index-raised'
        )}
        display='flex'
        justifyContent='center'
        wrap
      >
        {ROUTES.map(({ key, to }) => (
          <HyperLink key={to} to={to}>
            {translations.common.t(key)}
          </HyperLink>
        ))}
      </Navigation>
    </Animation>
  );
};

export { Menu };

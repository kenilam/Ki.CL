import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, HyperLink, Navigation } from 'design/components';

// Constants
import { ROUTES } from '@/views/navigation/constants';

const Menu: React.FunctionComponent = () => {
  const { t } = useTranslation('home');
  const { t: common } = useTranslation();

  return (
    <Animation
      delay={2000}
      duration='slower'
      easing='ease-sine-in'
      property='slide-from-bottom'
    >
      <Navigation
        aria-label={t('header.menu.label')}
        autoFlow='column'
        className={classNames(
          'kicl-padding-block-start-wide',
          'kicl-z-index-raised'
        )}
        justifyContent='center'
      >
        {ROUTES.map(({ key, to }) => (
          <HyperLink key={to} to={to}>
            {common(key)}
          </HyperLink>
        ))}
      </Navigation>
    </Animation>
  );
};

export { Menu };

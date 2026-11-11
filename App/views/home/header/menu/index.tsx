import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Navigation } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Link } from './link';

// Constants
import { ROUTES } from '@/views/routes';

const Menu: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <Animation
      delay={2000}
      duration='slower'
      easing='ease-sine-in'
      property='slide-from-bottom'
    >
      <Navigation
        aria-label={t('header.menu.label')}
        className={classNames(
          'kicl-padding-block-start-wide',
          'kicl-z-index-raised'
        )}
        display='flex'
        justifyContent='center'
        wrap
      >
        {ROUTES.map(({ to }) => {
          return <Link key={to} to={to} />;
        })}
      </Navigation>
    </Animation>
  );
};

export { Menu };

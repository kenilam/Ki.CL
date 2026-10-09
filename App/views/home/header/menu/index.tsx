import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, HyperLink, Navigation } from 'design/components';

// Constants
import { ROUTES } from '@/views/navigation/constants';

const COPY = {
  label: 'Pages',
};

const Menu: React.FunctionComponent = () => {
  return (
    <Animation
      delay={2000}
      duration='slower'
      easing='ease-sine-in'
      property='slide-from-bottom'
    >
      <Navigation
        aria-label={COPY.label}
        autoFlow='column'
        className={classNames(
          'kicl-padding-block-start-wide',
          'kicl-z-index-raised'
        )}
        justifyContent='center'
      >
        {ROUTES.map(({ title, to }) => (
          <HyperLink key={to} to={to}>
            {title}
          </HyperLink>
        ))}
      </Navigation>
    </Animation>
  );
};

export { Menu };

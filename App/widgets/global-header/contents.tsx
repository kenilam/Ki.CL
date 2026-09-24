import React from 'react';

// Libraries
import classNames from 'classnames';

// Widgets
import { SiteLogo } from '@/widgets';

// Components
import { Animation, Layout } from '@/components';

// Hooks
import { useResponsive } from '@/hooks';

// Partials
import { Navigation } from './navigation';
import { Theme } from './theme';

// Context
import { useGlobalHeaderContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => {
  const { node, show } = useGlobalHeaderContext();
  const { isMobile } = useResponsive();

  const className = classNames(
    'kicl-font-size-small',
    'kicl-position-fixed',
    'kicl-text-transform-uppercase',
    CLASS_NAME
  );

  return (
    <Animation property='slide-from-top' in={show}>
      <Layout
        alignItems='center'
        autoFlow='row'
        display='flex'
        gap={ isMobile ? 'wide' : 'normal' }
        ref={node}
      >
        <header className={className}>
          <SiteLogo className='kicl-margin-inline-end-auto' />
          {/* On mobile the menu button ends the row. */}
          {isMobile ? null : <Navigation />}
          <Theme />
          {isMobile ? <Navigation /> : null}
        </header>
      </Layout>
    </Animation>
  );
};

export { Contents };

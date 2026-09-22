import React from 'react';

// Libraries
import classNames from 'classnames';

// Widgets
import { SiteLogo } from '@/widgets';

// Hooks
import { useResponsive } from '@/hooks';

// Components
import { Animation, Layout } from '@/components';

// Partials
import { Navigation } from './navigation';

// Context
import { useGlobalHeaderContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => {
  const { node, show } = useGlobalHeaderContext();

  const { isTablet } = useResponsive();

  const className = classNames(
    'kicl-font-size-small',
    'kicl-position-fixed',
    CLASS_NAME
  );

  return (
    <Animation property='slide-from-top' in={show}>
      <Layout
        alignItems='center'
        autoFlow='column'
        gap={isTablet ? 'wider' : 'normal'}
        justifyContent='space-between'
        ref={node}
      >
        <header className={className}>
          <SiteLogo />
          <Navigation />
        </header>
      </Layout>
    </Animation>
  );
};

export { Contents };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Widgets
import { SiteLogo } from '@/widgets';

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
        autoFlow='column'
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

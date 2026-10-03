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
import { Theme } from './theme';

// Context
import { useGlobalHeaderContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const { node, show } = useGlobalHeaderContext();
  const { isMobile } = useResponsive();

  const className = classNames(
    'kicl-backdrop',
    'kicl-font-size-small',
    'kicl-inline-size-full',
    'kicl-inset-block-start-0',
    'kicl-inset-inline-start-0',
    'kicl-padding-block',
    'kicl-position-fixed',
    'kicl-text-transform-uppercase',
    'kicl-z-index-header',
    CLASS_NAME
  );

  return (
    <Animation property='slide-from-top' in={show}>
      <Layout
        alignItems='center'
        autoFlow='row'
        display='flex'
        gap='normal'
        ref={node}
      >
        <header className={className}>
          <SiteLogo className='kicl-margin-inline-end-auto' />
          {/* On mobile the menu button ends the row. */}
          {isMobile ? null : children}
          <Theme />
          {isMobile ? children : null}
        </header>
      </Layout>
    </Animation>
  );
};

export { Contents };

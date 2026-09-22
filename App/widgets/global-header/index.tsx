import React from 'react';
import ReactDOM from 'react-dom';

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
import { useGlobalHeaderContext, GlobalHeaderProvider } from './context';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header';

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
        <header className={className} role='banner'>
          <SiteLogo />
          <Navigation />
        </header>
      </Layout>
    </Animation>
  );
};

const GlobalHeader: React.FunctionComponent = () => {
  const { rect } = useGlobalHeaderContext();

  return (
    <>
      {ReactDOM.createPortal(
        <style data-widget-global-header-uuid={`${CLASS_NAME}--css-variables`}>
          {`:root {
              --${CLASS_NAME}--block-size: ${rect?.height || 0}px;
            }`}
        </style>,
        window.document.body
      )}
      <Contents />
    </>
  );
};

export { GlobalHeaderProvider, useGlobalHeaderContext, GlobalHeader };

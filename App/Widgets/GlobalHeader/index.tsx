import React from 'react';
import ReactDOM from 'react-dom';

// Libraries
import classNames from 'classnames';

// Widgets
import { SiteLogo } from '@/Widgets';

// Hooks
import { useResponsive } from '@/Hooks';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import Navigation from './Navigation';

// Context
import GlobalHeaderProvider, { useGlobalHeaderContext } from './Context';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header';

const Contents: React.FunctionComponent = () => {
  const { node } = useGlobalHeaderContext();

  const { isTablet } = useResponsive();

  const className = classNames(
    'kicl-font-size-small',
    'kicl-position-fixed',
    CLASS_NAME
  );

  return (
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
  );
};

const GlobalHeader: React.FunctionComponent = () => {
  const { rect, show } = useGlobalHeaderContext();

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
      <Animation animationStyle='slide-from-top' in={show}>
        <Contents />
      </Animation>
    </>
  );
};

export { GlobalHeaderProvider, useGlobalHeaderContext };
export default GlobalHeader;

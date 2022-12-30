import React from 'react';

// Widgets
import { SiteLogo } from '@/Widgets';

// Components
import MainMenu from './MainMenu';
import Style from './Style';

// Context
import GlobalHeaderProvider, { useGlobalHeaderContext } from './Context';

// Styles
import './Styles.scss';

const Contents: React.FunctionComponent = () => {
  const { node } = useGlobalHeaderContext();

  return (
    <header className='kicl--widgets--global-header' ref={node}>
      <Style />
      <SiteLogo />
      <MainMenu />
    </header>
  );
};

const GlobalHeader: React.FunctionComponent = () => {
  return (
    <GlobalHeaderProvider>
      <Contents />
    </GlobalHeaderProvider>
  );
};

export default GlobalHeader;

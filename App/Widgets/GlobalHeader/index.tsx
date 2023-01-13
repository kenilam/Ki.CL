import React, { useEffect } from 'react';

// Widgets
import { SiteLogo } from '@/Widgets';

// Components
import MainMenu, { CLASS_NAME as MAIN_MENU_CLASS_NAME } from './MainMenu';
import Style from './Style';

// Context
import GlobalHeaderProvider, { useGlobalHeaderContext } from './Context';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--global-header';

const Contents: React.FunctionComponent = () => {
  const { deleteURLSearchParams, node, updateURLSearchParams } =
    useGlobalHeaderContext();

  useEffect(() => {
    const onClick: Parameters<typeof window.addEventListener>[1] = (event) => {
      const target = event.target as HTMLElement;

      if (!target) {
        return;
      }

      const isGlobalHeader =
        target === node.current || target.closest(`.${CLASS_NAME}`);

      const isMainMenu =
        target === document.querySelector(`.${MAIN_MENU_CLASS_NAME}`) ||
        target.closest(`.${MAIN_MENU_CLASS_NAME}`);

      if (isGlobalHeader || isMainMenu) {
        return;
      }

      deleteURLSearchParams();
      updateURLSearchParams();
    };

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  });

  return (
    <header className={CLASS_NAME} ref={node}>
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

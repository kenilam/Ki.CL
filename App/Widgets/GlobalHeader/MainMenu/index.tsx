import React from 'react';

// Components
import BackDrop from './BackDrop';
import Menu from './Menu';
import Toggle from './Toggle';

const MainMenu: React.FunctionComponent = () => {
  return (
    <>
      <BackDrop />
      <Toggle />
      <Menu />
    </>
  );
};

export default MainMenu;

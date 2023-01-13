import React from 'react';

// Components
import BackDrop from './BackDrop';
import Menu, { CLASS_NAME } from './Menu';
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

export { CLASS_NAME };
export default MainMenu;

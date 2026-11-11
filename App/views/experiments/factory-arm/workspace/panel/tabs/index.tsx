import React from 'react';

// Components
import { Menu } from 'design/components';

// Partials
import { Log } from './log';
import { Switch } from './switch';

/** The panel's header, beside the button that closes the panel. */
const Tabs: React.FunctionComponent = () => {
  return (
    <Menu
      alignItems='center'
      autoFlow='column'
      frames='auto--max-content'
      gap='narrow'
    >
      <Switch />
      <Log />
    </Menu>
  );
};

export { Tabs };

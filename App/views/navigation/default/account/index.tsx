import React from 'react';

// Components
import { Menu, Popover, PopoverContent } from 'design/components';

// Partials
import { Profile } from './profile';
import { SignOut } from './sign-out';
import { Trigger } from './trigger';

/** The account menu that ends the header's navigation. */
const Default: React.FunctionComponent = () => {
  return (
    <Popover>
      <Trigger />
      <PopoverContent placement='block-end-end'>
        <Menu autoFlow='row' gap='narrow'>
          <Profile />
          <SignOut />
        </Menu>
      </PopoverContent>
    </Popover>
  );
};

export { Default };

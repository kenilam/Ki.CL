import React from 'react';

// Components
import { Menu } from 'design/components';

// Partials
import { Profile } from './profile';
import { SignOut } from './sign-out';

/** The account as one row of the narrow menu: the profile link, then sign out. */
const Narrow: React.FunctionComponent = () => {
  return (
    <Menu
      autoFlow='row'
      className='kicl-padding-block-start-wider'
      gap='narrow'
      justifyItems='stretch'
    >
      <Profile />
      <SignOut />
    </Menu>
  );
};

export { Narrow };

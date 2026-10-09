import React from 'react';

// Components
import { Animation, Button, HyperLink, Menu } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { PATH as ME_PATH } from '@/views/me/constants';

// Constants
import { COPY, SIGN_OUT_ID } from '@/views/account/constants';

/** The account as one row of the mobile menu: the profile link, then sign out. */
const Mobile: React.FunctionComponent = () => {
  return (
    <Menu autoFlow='row' className='kicl-padding-block-start-wider' gap='narrow' justifyItems='stretch'>
      <Animation property='slide-from-bottom' delay={900}>
        <HyperLink
          before={<Ri.RiAccountCircleLine aria-hidden />}
          className='kicl-inline-size-full'
          lookLikeButton
          to={`/${ME_PATH}`}
          variant='secondary'
        >
          {COPY.profile}
        </HyperLink>
      </Animation>
      <Animation property='slide-from-bottom' delay={1200}>
        <Button
          before={<Ri.RiLogoutCircleLine aria-hidden />}
          className='kicl-inline-size-full'
          command='show-modal'
          commandFor={SIGN_OUT_ID}
          variant='secondary'
        >
          {COPY.signOut}
        </Button>
      </Animation>
    </Menu>
  );
};

export { Mobile };

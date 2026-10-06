import React from 'react';

// Components
import {
  Animation,
  Button,
  HyperLink,
  Menu,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { PATH as ME_PATH } from '@/views/me/constants';

// Constants
import { COPY, SIGN_OUT_ID } from '@/views/account/constants';

/** The account menu that ends the header's navigation. */
const Default: React.FunctionComponent = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='kicl-font-size' unstyled>
          <Ri.RiAccountCircleLine aria-hidden />
          <Text className='kicl-hidden' is='span'>
            {COPY.account}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent placement='block-end-end'>
        <Menu autoFlow='row' gap='narrow'>
          <Animation property='slide-from-top' delay={300}>
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
          <Animation property='slide-from-top' delay={600}>
            <Button
              className='kicl-inline-size-full'
              command='show-modal'
              commandFor={SIGN_OUT_ID}
              variant='secondary'
            >
              <Ri.RiLogoutCircleLine aria-hidden />
              {COPY.signOut}
            </Button>
          </Animation>
        </Menu>
      </PopoverContent>
    </Popover>
  );
};

export { Default };

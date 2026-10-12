import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

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
import { SIGN_OUT_ID } from '@/views/account/constants';

/** The account menu that ends the header's navigation. */
const Default: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='kicl-font-size' unstyled>
          <Ri.RiAccountCircleLine aria-hidden />
          <Text className='kicl-hidden' is='span'>
            {t('account.label')}
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
              {t('account.profile')}
            </HyperLink>
          </Animation>
          <Animation property='slide-from-top' delay={600}>
            <Button
              before={<Ri.RiLogoutCircleLine aria-hidden />}
              className='kicl-inline-size-full'
              command='show-modal'
              commandFor={SIGN_OUT_ID}
              variant='secondary'
            >
              {t('account.signOut.label')}
            </Button>
          </Animation>
        </Menu>
      </PopoverContent>
    </Popover>
  );
};

export { Default };

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
import * as Bs from 'react-icons/bs';

// Views
import { PAGES } from '@/views/routes';

// Constants
import { SIGN_OUT_ID } from '@/views/account/constants';

/** The account menu that ends the header's navigation. */
const Default: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='kicl-font-size' unstyled>
          <Bs.BsPersonCircle aria-hidden />
          <Text className='kicl-hidden' is='span'>
            {t('account')}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent placement='block-end-end'>
        <Menu autoFlow='row' gap='narrow'>
          <Animation property='slide-from-top' delay={300}>
            <HyperLink
              before={<Bs.BsPersonCircle aria-hidden />}
              className='kicl-inline-size-full'
              lookLikeButton
              to={PAGES.me}
              variant='secondary'
            >
              {t('my_profile')}
            </HyperLink>
          </Animation>
          <Animation property='slide-from-top' delay={600}>
            <Button
              before={
                <Bs.BsBoxArrowRight aria-hidden className='kicl-rtl-mirror' />
              }
              className='kicl-inline-size-full'
              command='show-modal'
              commandfor={SIGN_OUT_ID}
              variant='secondary'
            >
              {t('action', { context: 'sign_out' })}
            </Button>
          </Animation>
        </Menu>
      </PopoverContent>
    </Popover>
  );
};

export { Default };

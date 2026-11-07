import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Animation, Button, HyperLink, Menu } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Views
import { PAGES } from '@/views/routes';

// Constants
import { SIGN_OUT_ID } from '@/views/account/constants';

/** The account as one row of the mobile menu: the profile link, then sign out. */
const Mobile: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Menu
      autoFlow='row'
      className='kicl-padding-block-start-wider'
      gap='narrow'
      justifyItems='stretch'
    >
      <Animation property='slide-from-bottom' delay={900}>
        <HyperLink
          before={<Ri.RiAccountCircleLine aria-hidden />}
          className='kicl-inline-size-full'
          lookLikeButton
          to={PAGES.me}
          variant='secondary'
        >
          {t('my_profile')}
        </HyperLink>
      </Animation>
      <Animation property='slide-from-bottom' delay={1200}>
        <Button
          before={
            <Ri.RiLogoutCircleLine aria-hidden className='kicl-rtl-mirror' />
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
  );
};

export { Mobile };

import React from 'react';

// Components
import { Animation, HyperLink } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const Profile: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Animation property='slide-from-top' delay={300}>
      <HyperLink
        before={<Tb.TbUserCircle aria-hidden />}
        className='kicl-inline-size-full'
        lookLikeButton
        to={PAGES.me}
        variant='secondary'
      >
        {t('my_profile')}
      </HyperLink>
    </Animation>
  );
};

export { Profile };

import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const ChangePassword: React.FunctionComponent = () => {
  const { t } = useTranslation('me');

  return (
    <HyperLink lookLikeButton size='small' to={PAGES.password} variant='ghost'>
      {t('change_password')}
    </HyperLink>
  );
};

export { ChangePassword };

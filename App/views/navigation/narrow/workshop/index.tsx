import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const Workshop: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink
      className='kicl-font-size-medium'
      end={false}
      to={PAGES.workshop}
      unstyled
    >
      {t('workshop')}
    </HyperLink>
  );
};

export { Workshop };

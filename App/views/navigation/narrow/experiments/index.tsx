import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const Experiments: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink
      className='kicl-font-size-medium'
      end={false}
      to={PAGES.experiments}
      unstyled
    >
      {t('experiments')}
    </HyperLink>
  );
};

export { Experiments };

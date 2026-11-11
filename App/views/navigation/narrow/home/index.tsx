import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const Home: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink className='kicl-font-size-medium' to={PAGES.home}>
      {t('home')}
    </HyperLink>
  );
};

export { Home };

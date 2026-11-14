import React from 'react';

// Components
import { HyperLink } from 'design/components';

// Views
import { PAGES } from '@/views/routes';

// Hooks
import { useTranslation } from 'design/hooks';

const About: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <HyperLink className='kicl-font-size-medium' to={PAGES.about}>
      {t('about')}
    </HyperLink>
  );
};

export { About };

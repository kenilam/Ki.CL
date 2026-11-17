import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Site: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <ListItem className='kicl-print-only'>
      <HyperLink className='kicl-font-family-mono' to={PAGES.home}>
        {t('profile.site')}
      </HyperLink>
    </ListItem>
  );
};

export { Site };

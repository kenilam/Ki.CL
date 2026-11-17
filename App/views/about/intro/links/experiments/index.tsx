import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Experiments: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <HyperLink className='kicl-font-family-mono' to={PAGES.experiments}>
        {t('experiments')}
      </HyperLink>
    </ListItem>
  );
};

export { Experiments };

import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

const Linkedin: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <HyperLink
        className='kicl-color-neutral-64'
        to={t('url', { context: 'linkedin' })}
      >
        {t('linkedin')}
      </HyperLink>
    </ListItem>
  );
};

export { Linkedin };

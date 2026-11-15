import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

const Github: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <HyperLink
        className='kicl-color-neutral-64'
        to={t('url', { context: 'github' })}
      >
        {t('github')}
      </HyperLink>
    </ListItem>
  );
};

export { Github };

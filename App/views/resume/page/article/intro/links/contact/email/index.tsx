import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { usePrinting, useTranslation } from 'design/hooks';

const Email: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const printing = usePrinting();

  const email = t('email');

  if (!printing) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink className='kicl-font-family-mono' to={`mailto:${email}`}>
        {email}
      </HyperLink>
    </ListItem>
  );
};

export { Email };

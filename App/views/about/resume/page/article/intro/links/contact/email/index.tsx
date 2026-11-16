import React from 'react';

import classNames from 'classnames';

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
      <HyperLink
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
        to={`mailto:${email}`}
      >
        {email}
      </HyperLink>
    </ListItem>
  );
};

export { Email };

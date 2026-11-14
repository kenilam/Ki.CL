import React from 'react';

import classNames from 'classnames';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Resume: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <HyperLink
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
        to={PAGES.resume}
      >
        {t('resume')}
      </HyperLink>
    </ListItem>
  );
};

export { Resume };

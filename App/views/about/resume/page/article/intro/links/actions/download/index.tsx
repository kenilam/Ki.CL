import React from 'react';

import classNames from 'classnames';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useDownload } from '@/views/about/resume/use-download';

import { FILE } from '@/views/about/resume/constants';

const Download: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const context = useDownload();

  if (!context) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
        data-track='Resume PDF'
        download
        reloadDocument
        to={FILE}
      >
        {t('action', { context })}
      </HyperLink>
    </ListItem>
  );
};

export { Download };

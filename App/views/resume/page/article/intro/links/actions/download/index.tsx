import React from 'react';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { MASTER } from '@/views/resume/content';
import { useVersion } from '@/views/resume/context';
import { useDownload } from '@/views/resume/use-download';

import { FILE } from '@/views/resume/constants';

const Download: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { slug } = useVersion();
  const context = useDownload();

  if (slug !== MASTER.slug || !context) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        className='kicl-font-family-mono'
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

import React from 'react';

import * as Tb from 'react-icons/tb';

import { HyperLink, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useDownload } from '@/views/resume/use-download';

import { FILE } from '@/views/resume/constants';

const Download: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const context = useDownload();

  if (!context) {
    return null;
  }

  return (
    <ListItem>
      <HyperLink
        before={<Tb.TbDownload aria-hidden />}
        className='kicl-inline-size-full'
        data-track='Resume PDF'
        download
        justifyContent='center'
        lookLikeButton
        reloadDocument
        size='large'
        to={FILE}
        variant='secondary'
      >
        {t('action', { context })}
      </HyperLink>
    </ListItem>
  );
};

export { Download };

import React from 'react';
import { useTranslation } from 'react-i18next';
import { HyperLink } from 'design/components';
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';
import * as Ri from 'react-icons/ri';

export const Bookmark: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');

  return (
    <HyperLink
      before={<Ri.RiBookmark2Line />}
      lookLikeButton
      size='small'
      to={`/${EXPERIMENTS}`}
      variant='ghost'
    >
      {t('action', { context: 'bookmark' })}
    </HyperLink>
  );
};

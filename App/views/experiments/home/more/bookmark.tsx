import React from 'react';
import { useTranslation } from 'react-i18next';
import { HyperLink } from 'design/components';
import { PATH as EXPERIMENTS } from '@/views/experiments/constants';

export const Bookmark: React.FunctionComponent = () => {
  const { t } = useTranslation('experiments');

  return (
    <HyperLink lookLikeButton size='small' to={`/${EXPERIMENTS}`}>
      {t('action', { context: 'bookmark' })}
    </HyperLink>
  );
};

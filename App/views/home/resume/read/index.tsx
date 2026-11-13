import React from 'react';

import * as Tb from 'react-icons/tb';

import { HyperLink } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Read: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <HyperLink
      after={<Tb.TbArrowRight aria-hidden />}
      lookLikeButton
      to={PAGES.resume}
    >
      {t('action', { context: 'resume' })}
    </HyperLink>
  );
};

export { Read };

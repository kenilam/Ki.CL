import React from 'react';

import * as Tb from 'react-icons/tb';

import { HyperLink } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <HyperLink
      after={<Tb.TbArrowRight aria-hidden className='kicl-rtl-mirror' />}
      className='kicl-font-family-mono'
      to={PAGES.workshop}
    >
      {t('action', { context: 'workshop' })}
    </HyperLink>
  );
};

export { Open };

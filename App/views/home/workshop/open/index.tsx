import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { HyperLink } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('home');

  return (
    <HyperLink
      after={<Tb.TbArrowRight aria-hidden />}
      className={classNames('kicl-font-family-mono', 'kicl-font-size-small')}
      to={PAGES.workshop}
    >
      {t('action', { context: 'workshop' })}
    </HyperLink>
  );
};

export { Open };

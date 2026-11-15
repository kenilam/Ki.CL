import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { Button } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';

import { CLASS_NAME as HOME } from '@/views/home/constants';

import './styles.scss';

const CLASS_NAME = `${HOME}__top`;

const onClick = () => {
  window.scrollTo({ top: 0 });
};

const Top: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { isNarrow } = useResponsive();

  if (!isNarrow) {
    return null;
  }

  return (
    <Button
      aria-label={t('action', { context: 'top' })}
      className={classNames(
        CLASS_NAME,
        'kicl-inset-block-end-wide',
        'kicl-inset-inline-start-0',
        'kicl-position-absolute'
      )}
      onClick={onClick}
      unstyled
    >
      <Tb.TbChevronDown
        aria-hidden
        className={classNames('kicl-display-block', 'kicl-font-size-larger')}
      />
    </Button>
  );
};

export { Top };

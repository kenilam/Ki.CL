import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import { useResponsive } from 'design/hooks';

import './styles.scss';

import { CLASS_NAME as WORKSHOP } from '@/views/home/workshop/constants';

const CLASS_NAME = `${WORKSHOP}__hint`;

const Hint: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  if (!isNarrow) {
    return null;
  }

  return (
    <Tb.TbChevronDown
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-larger',
        'kicl-inset-block-end-wide',
        'kicl-justify-self-start',
        'kicl-margin-inline-start',
        'kicl-position-sticky',
        'kicl-scroll-leave-near'
      )}
    />
  );
};

export { Hint };

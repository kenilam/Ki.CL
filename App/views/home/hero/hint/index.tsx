import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

import './styles.scss';

import { CLASS_NAME } from './constants';

const Hint: React.FunctionComponent = () => {
  return (
    <span
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-inset-block-end-wide',
        'kicl-inset-inline-start',
        'kicl-position-absolute',
        'kicl-scroll-enter-near'
      )}
    >
      <Tb.TbChevronDown
        className={classNames(
          'kicl-display-block',
          'kicl-font-size-larger',
          'kicl-scroll-leave-near'
        )}
      />
    </span>
  );
};

export { Hint };

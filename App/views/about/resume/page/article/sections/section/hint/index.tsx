import React from 'react';

import classNames from 'classnames';

import * as Tb from 'react-icons/tb';

const Hint: React.FunctionComponent = () => {
  return (
    <Tb.TbChevronDown
      aria-hidden
      className={classNames(
        'kicl-font-size-larger',
        'kicl-inset-block-end-wide',
        'kicl-inset-inline-start',
        'kicl-position-absolute',
        'kicl-print-hidden',
        'kicl-scroll-enter-near'
      )}
    />
  );
};

export { Hint };

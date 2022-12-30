import React, { PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Logo: React.FunctionComponent<PropsWithRef<Spec.Props>> = ({
  className: origin = '',
  ...rest
}) => {
  const className = classNames('kicl--components--logo', origin);

  return (
    <svg
      {...rest}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 385 160'
      aria-label='Ki.CL'
    >
      <g data-letter='k'>
        <rect x='60' width='40' height='60' />
        <polyline points='0 0 0 160 40 160 40 100 60 100 60 160 100 160 100 80 70 80 70 60 40 60 40 0 0 0' />
      </g>
      <g data-letter='i'>
        <rect x='120' width='40' height='40' />
        <rect x='120' y='60' width='40' height='100' />
      </g>
      <g data-letter='c'>
        <path d='M253,120a40,40,0,1,1,29.74-66.74L311,25a80,80,0,1,0,22,55H293A40,40,0,0,1,253,120Z' />
      </g>
      <g data-letter='l'>
        <rect x='345' width='40' height='160' />
      </g>
    </svg>
  );
};

export default Logo;

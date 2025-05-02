import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Menu: React.FunctionComponent<Spec.Props> = ({
  className: origin = '',
  open = false,
  ...rest
}) => {
  const className = classNames(
    'kicl--icons--menu',
    {
      [`kicl--icons--menu--is-open`]: open,
    },
    origin
  );

  return (
    <svg
      {...rest}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 160 120'
    >
      <g data-parts='lines'>
        <rect />
        <rect />
        <rect />
      </g>
      <g data-parts='cross'>
        <g>
          <rect />
        </g>
        <g>
          <rect />
        </g>
      </g>
    </svg>
  );
};

export default Menu;

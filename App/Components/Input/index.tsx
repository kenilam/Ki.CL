import React from 'react';
import classNames from 'classnames';

import type { Props } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--input';

/**
 * Text field control — API aligned with
 * https://ui.shadcn.com/docs/components/base/input
 */
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type = 'text', ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot='input'
      className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
      {...rest}
    />
  )
);

Input.displayName = 'Input';

export type { Props as InputProps } from './Spec';
export default Input;

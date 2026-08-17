import React, { useState } from 'react';
import classNames from 'classnames';

import { Ri } from '@/Icons';

import type { Props } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--checkbox';

/**
 * Toggle checkbox - API aligned with
 * https://ui.shadcn.com/docs/components/base/checkbox
 */
const Checkbox = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      checked,
      className,
      defaultChecked = false,
      disabled,
      onCheckedChange,
      ...rest
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const value = isControlled ? checked : uncontrolled;
    const isIndeterminate = value === 'indeterminate';
    const isOn = value === true;

    const toggle = () => {
      if (disabled) {
        return;
      }
      const next = !isOn;
      if (!isControlled) {
        setUncontrolled(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <button
        ref={ref}
        type='button'
        role='checkbox'
        aria-checked={isIndeterminate ? 'mixed' : isOn}
        disabled={disabled}
        data-slot='checkbox'
        className={classNames(
          CLASS_NAME,
          {
            [`${CLASS_NAME}--checked`]: isOn,
            [`${CLASS_NAME}--indeterminate`]: isIndeterminate,
            [`${CLASS_NAME}--disabled`]: disabled,
          },
          className
        )}
        onClick={toggle}
        {...rest}
      >
        {isIndeterminate ? (
          <Ri.RiSubtractLine className={`${CLASS_NAME}__icon`} aria-hidden />
        ) : isOn ? (
          <Ri.RiCheckLine className={`${CLASS_NAME}__icon`} aria-hidden />
        ) : null}
      </button>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export type { Props as CheckboxProps, CheckedState } from './Spec';
export default Checkbox;

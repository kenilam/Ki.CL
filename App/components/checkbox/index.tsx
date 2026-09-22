import React, { useCallback } from 'react';
import classNames from 'classnames';

import type { Props } from './spec';

import './styles.scss';

const CLASS_NAME = 'kicl--components--checkbox';

/**
 * Native checkbox - API aligned with
 * https://ui.shadcn.com/docs/components/base/checkbox
 *
 * `indeterminate` has no HTML attribute, so it is set on the element.
 */
const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ checked, className, onChange, onCheckedChange, ...rest }, ref) => {
    const isIndeterminate = checked === 'indeterminate';

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        if (node) {
          node.indeterminate = isIndeterminate;
        }
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [isIndeterminate, ref]
    );

    return (
      <input
        ref={setRef}
        type='checkbox'
        data-slot='checkbox'
        className={classNames(CLASS_NAME, className)}
        checked={checked === undefined ? undefined : checked === true}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        {...rest}
      />
    );
  }
);

Checkbox.displayName = 'Checkbox';

export type { Props as CheckboxProps, CheckedState } from './spec';
export { Checkbox };

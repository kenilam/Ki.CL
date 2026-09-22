import React from 'react';

// Libraries
import classNames from 'classnames';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

// Partials
import { SelectLabel } from '@/components/select/label';

import type { SelectGroupProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__group`;

const isLabel = (
  child: React.ReactNode
): child is React.ReactElement<React.ComponentProps<typeof SelectLabel>> =>
  React.isValidElement(child) && child.type === SelectLabel;

/**
 * A native `<optgroup>`. A SelectLabel child becomes its `label`, which every
 * browser shows, with or without base-select.
 */
const SelectGroup = React.forwardRef<HTMLOptGroupElement, SelectGroupProps>(
  ({ children, className, label, ...rest }, ref) => {
    const items = React.Children.toArray(children);
    const labelChild = items.find(isLabel);

    return (
      <optgroup
        ref={ref}
        data-slot='select-group'
        className={classNames(CLASS_NAME, className)}
        label={label ?? labelChild?.props.children}
        {...rest}
      >
        {items.filter((child) => !isLabel(child))}
      </optgroup>
    );
  }
);

SelectGroup.displayName = 'SelectGroup';

export { SelectGroup };

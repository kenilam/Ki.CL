import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

import type { SelectProps } from './spec';

/**
 * A native `<select>` - API aligned with
 * https://ui.shadcn.com/docs/components/base/select
 *
 * Where `appearance: base-select` is supported, SelectTrigger and the picker
 * are styled. Elsewhere the browser draws its own select from the same
 * options, so keyboard, typeahead and form value come from the platform.
 * `id` and aria props (from FormControl) land on the `<select>`.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      defaultValue,
      onChange,
      onValueChange,
      placeholder,
      value,
      ...rest
    },
    ref
  ) => (
    <select
      ref={ref}
      data-slot='select'
      className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
      value={value}
      defaultValue={
        value === undefined && placeholder !== undefined
          ? (defaultValue ?? '')
          : defaultValue
      }
      onChange={(event) => {
        onChange?.(event);
        onValueChange?.(event.currentTarget.value);
      }}
      {...rest}
    >
      {children}
      {placeholder !== undefined ? (
        <option value='' disabled hidden>
          {placeholder}
        </option>
      ) : null}
    </select>
  )
);

Select.displayName = 'Select';

export type {
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
} from './spec';

export { SelectContent } from './content';
export { SelectGroup } from './group';
export { SelectItem } from './item';
export { SelectLabel } from './label';
export { SelectSeparator } from './separator';
export { SelectTrigger } from './trigger';
export { SelectValue } from './value';
export { Select };

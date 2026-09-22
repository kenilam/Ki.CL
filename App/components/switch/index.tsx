import React from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

import type { Props } from './spec';
import { SwitchLabel } from './switch-label';

import './styles.scss';

const CLASS_NAME = 'kicl--components--switch';
const FIELD_CLASS_NAME = 'kicl--components--switch-field';

/**
 * `switch` is not in React's attribute list yet; an empty string still
 * renders it. Safari draws a native switch from it; `role` covers the rest.
 */
const SWITCH_ATTRIBUTE = {
  switch: '',
} as React.ComponentPropsWithoutRef<'input'>;

/**
 * Toggle switch on a native checkbox - API aligned with
 * https://ui.shadcn.com/docs/components/base/switch
 *
 * Pair with {@link SwitchLabel} as a child, or pass `label`. Either way the
 * `<label>` wraps the control, so the text is its accessible name.
 */
const Switch = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className,
      label,
      onChange,
      onCheckedChange,
      size = 'default',
      ...rest
    },
    ref
  ) => {
    const labelNode =
      label != null && label !== false ? (
        <SwitchLabel>{label}</SwitchLabel>
      ) : null;

    const control = (
      <input
        ref={ref}
        type='checkbox'
        // Native `checked` supplies the state; ARIA in HTML forbids aria-checked here.
        // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props
        role='switch'
        {...SWITCH_ATTRIBUTE}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--size--${size}`,
          className
        )}
        onChange={(event) => {
          onChange?.(event);
          onCheckedChange?.(event.currentTarget.checked);
        }}
        {...rest}
      />
    );

    if (!labelNode && !children) {
      return control;
    }

    return (
      <Layout
        display='inline-grid'
        autoFlow='column'
        alignItems='center'
        gap='narrow'
      >
        <label className={FIELD_CLASS_NAME}>
          {control}
          {labelNode}
          {children}
        </label>
      </Layout>
    );
  }
);

Switch.displayName = 'Switch';

export type { Props as SwitchProps, SwitchLabelProps } from './spec';
export { SwitchLabel } from './switch-label';
export { Switch };

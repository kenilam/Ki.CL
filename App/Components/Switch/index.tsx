import React, { useId, useState } from 'react';
import classNames from 'classnames';

import type { Props } from './Spec';
import SwitchLabel from './SwitchLabel';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--switch';
const FIELD_CLASS_NAME = 'kicl--components--switch-field';

const isSwitchLabel = (
  child: React.ReactNode
): child is React.ReactElement<React.ComponentProps<typeof SwitchLabel>> =>
  React.isValidElement(child) &&
  (child.type === SwitchLabel ||
    (typeof child.type !== 'string' &&
      (child.type as { displayName?: string }).displayName === 'SwitchLabel'));

/**
 * Toggle switch - API aligned with
 * https://ui.shadcn.com/docs/components/base/switch
 *
 * Pair with {@link SwitchLabel} as a child, or pass `label`.
 */
const Switch = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      checked,
      children,
      className,
      defaultChecked = false,
      disabled,
      id,
      label,
      onCheckedChange,
      size = 'default',
      ...rest
    },
    ref
  ) => {
    const isControlled = checked !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const isOn = isControlled ? Boolean(checked) : uncontrolled;
    const generatedId = useId();
    const switchId = id ?? generatedId;

    let labelChild: React.ReactElement | null = null;
    const otherChildren: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      if (isSwitchLabel(child)) {
        labelChild = child;
        return;
      }
      if (child != null && child !== false) {
        otherChildren.push(child);
      }
    });

    const labelNode =
      labelChild ??
      (label != null && label !== false ? (
        <SwitchLabel>{label}</SwitchLabel>
      ) : null);

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

    const control = (
      <button
        ref={ref}
        id={switchId}
        type='button'
        role='switch'
        aria-checked={isOn}
        disabled={disabled}
        className={classNames(
          CLASS_NAME,
          `${CLASS_NAME}--size--${size}`,
          {
            [`${CLASS_NAME}--checked`]: isOn,
            [`${CLASS_NAME}--disabled`]: disabled,
          },
          className
        )}
        onClick={toggle}
        {...rest}
      >
        <span className={`${CLASS_NAME}__thumb`} aria-hidden />
        {otherChildren}
      </button>
    );

    if (!labelNode) {
      return control;
    }

    return (
      <label
        className={classNames(FIELD_CLASS_NAME, {
          [`${FIELD_CLASS_NAME}--disabled`]: disabled,
        })}
      >
        {control}
        {labelNode}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export type { Props as SwitchProps, SwitchLabelProps } from './Spec';
export { default as SwitchLabel } from './SwitchLabel';
export default Switch;

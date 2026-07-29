import React from 'react';
import classNames from 'classnames';

import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Textarea from '@/Components/Textarea';

import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--input-group';

/**
 * Input with addons — API aligned with
 * https://ui.shadcn.com/docs/components/base/input-group
 */
const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='input-group'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    >
      {children}
    </div>
  )
);

InputGroup.displayName = 'InputGroup';

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ align = 'inline-start', className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='input-group-addon'
      data-align={align}
      className={classNames(
        `${CLASS_NAME}__addon`,
        `${CLASS_NAME}__addon--${align}`,
        className
      )}
      {...rest}
    />
  )
);

InputGroupAddon.displayName = 'InputGroupAddon';

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(({ className, size = 'sm', variant = 'ghost', ...rest }, ref) => (
  <Button
    ref={ref}
    size={
      size === 'xs' || size === 'icon-xs'
        ? 'small'
        : size === 'sm' || size === 'icon-sm'
          ? 'small'
          : undefined
    }
    unstyled={variant === 'ghost' || variant === 'link'}
    className={classNames(`${CLASS_NAME}__button`, className)}
    {...(rest as React.ComponentProps<typeof Button>)}
  />
));

InputGroupButton.displayName = 'InputGroupButton';

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, ...rest }, ref) => (
  <Input
    ref={ref}
    data-slot='input-group-control'
    className={classNames(`${CLASS_NAME}__control`, className)}
    {...rest}
  />
));

InputGroupInput.displayName = 'InputGroupInput';

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  InputGroupTextareaProps
>(({ className, ...rest }, ref) => (
  <Textarea
    ref={ref}
    data-slot='input-group-control'
    className={classNames(`${CLASS_NAME}__control`, className)}
    {...rest}
  />
));

InputGroupTextarea.displayName = 'InputGroupTextarea';

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, ...rest }, ref) => (
    <span
      ref={ref}
      data-slot='input-group-text'
      className={classNames(
        `${CLASS_NAME}__text`,
        'kicl-font-size-small',
        className
      )}
      {...rest}
    />
  )
);

InputGroupText.displayName = 'InputGroupText';

export type {
  InputGroupAddonProps,
  InputGroupAlign,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from './Spec';

export {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};

export default InputGroup;

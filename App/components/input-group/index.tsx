import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { InputGroupProps } from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Partials
import { InputGroupAddon } from './addon';
import { InputGroupButton } from './button';
import { InputGroupInput } from './input';
import { InputGroupText } from './text';
import { InputGroupTextarea } from './textarea';

/**
 * Input with addons - API aligned with
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

export type {
  InputGroupAddonProps,
  InputGroupAlign,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from './spec';

export {
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  InputGroup,
};

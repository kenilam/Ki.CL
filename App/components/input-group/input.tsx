import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Input } from '@/components/input';

// Spec
import type { InputGroupInputProps } from './spec';

// Constants
import { CLASS_NAME } from './constants';

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

export { InputGroupInput };

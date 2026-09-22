import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { InputGroupAddonProps } from '@/components/input-group/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as INPUT_GROUP } from '@/components/input-group/constants';

const CLASS_NAME = `${INPUT_GROUP}__addon`;

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ align = 'inline-start', className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='input-group-addon'
      data-align={align}
      className={classNames(CLASS_NAME, `${CLASS_NAME}--${align}`, className)}
      {...rest}
    />
  )
);

InputGroupAddon.displayName = 'InputGroupAddon';

export { InputGroupAddon };

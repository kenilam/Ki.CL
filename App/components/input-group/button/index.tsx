import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button } from '@/components/button';

// Spec
import type { InputGroupButtonProps } from '@/components/input-group/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as INPUT_GROUP } from '@/components/input-group/constants';

const CLASS_NAME = `${INPUT_GROUP}__button`;

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
    className={classNames(CLASS_NAME, className)}
    {...(rest as React.ComponentProps<typeof Button>)}
  />
));

InputGroupButton.displayName = 'InputGroupButton';

export { InputGroupButton };

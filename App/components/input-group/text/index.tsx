import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { InputGroupTextProps } from '@/components/input-group/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as INPUT_GROUP } from '@/components/input-group/constants';

const CLASS_NAME = `${INPUT_GROUP}__text`;

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
  ({ className, ...rest }, ref) => (
    <span
      ref={ref}
      data-slot='input-group-text'
      className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
      {...rest}
    />
  )
);

InputGroupText.displayName = 'InputGroupText';

export { InputGroupText };

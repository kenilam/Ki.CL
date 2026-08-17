import React from 'react';
import classNames from 'classnames';

import type { BadgeLabelProps } from './Spec';

const CLASS_NAME = 'kicl--components--badge__label';

/**
 * Field-name slot for {@link Badge} - place inside the chip before the value.
 */
const BadgeLabel: React.FunctionComponent<BadgeLabelProps> = ({
  children,
  className,
  ...rest
}) => (
  <span
    className={classNames(CLASS_NAME, 'kicl-font-weight', className)}
    {...rest}
  >
    {children}
  </span>
);

BadgeLabel.displayName = 'BadgeLabel';

export default BadgeLabel;

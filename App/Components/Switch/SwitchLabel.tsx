import React from 'react';
import classNames from 'classnames';

import type { SwitchLabelProps } from './Spec';

const CLASS_NAME = 'kicl--components--switch__label';

/**
 * Visible name for {@link Switch} - nest inside Switch or use the `label` prop.
 */
const SwitchLabel: React.FunctionComponent<SwitchLabelProps> = ({
  children,
  className,
  ...rest
}) => (
  <span
    className={classNames(
      CLASS_NAME,
      'kicl-font-size-small',
      'kicl-color-grey-darker',
      className
    )}
    {...rest}
  >
    {children}
  </span>
);

SwitchLabel.displayName = 'SwitchLabel';

export default SwitchLabel;

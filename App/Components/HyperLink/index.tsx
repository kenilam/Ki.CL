import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { NavLink } from '@/Router';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--components--hyper-link';

const HyperLink: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', unstyled = false, ...rest }) => {
  const className = classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--unstyled`]: unstyled,
    },
    String(origin)
  );

  return (
    <NavLink {...rest} className={className}>
      {children}
    </NavLink>
  );
};

type HyperLinkProps = Spec.Props;

export { type HyperLinkProps };
export default HyperLink;

import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Heading: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', is = 'h1', ...rest }) => {
  const className = classNames('kicl--components--heading', origin);

  const Component = is;

  return (
    <Component {...rest} className={className} data-is={is}>
      {children}
    </Component>
  );
};

type HeadingProps = Spec.Props;

export { type HeadingProps };
export default Heading;

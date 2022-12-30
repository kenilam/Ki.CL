import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Span: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', ...rest }) => {
  const className = classNames('kicl--components--span', origin);

  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
};

export default Span;

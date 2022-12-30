import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Paragraph: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', ...rest }) => {
  const className = classNames('kicl--components--paragraph', origin);

  return (
    <p {...rest} className={className}>
      {children}
    </p>
  );
};

export default Paragraph;

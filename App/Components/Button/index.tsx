import React, { PropsWithChildren, PropsWithRef } from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

const Button: React.FunctionComponent<
  Required<PropsWithChildren> & PropsWithRef<Spec.Props>
> = ({ children, className: origin = '', ...rest }) => {
  const className = classNames('kicl--components--button', origin);

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
};

type ButtonProps = Spec.Props;

export { type ButtonProps };
export default Button;

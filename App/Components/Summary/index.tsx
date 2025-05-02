import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--summary';

const Summary: React.FunctionComponent<Spec.Props> = ({
  className: _className,
  children,
  ...props
}) => {
  const className = classNames(CLASS_NAME, _className);

  return (
    <summary {...props} className={className}>
      {children}
    </summary>
  );
};

type SummaryProps = Spec.Props;

export { type SummaryProps };
export default Summary;

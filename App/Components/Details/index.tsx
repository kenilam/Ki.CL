import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './Styles.scss';

// Spec
import * as Spec from './Spec';

const CLASS_NAME = 'kicl--components--details';

const Details: React.FunctionComponent<Spec.Props> = ({
  className: _className,
  children,
  ...props
}) => {
  const className = classNames(CLASS_NAME, _className);

  return (
    <details {...props} className={className}>
      {children}
    </details>
  );
};

type DetailsProps = Spec.Props;

export { type DetailsProps };
export default Details;

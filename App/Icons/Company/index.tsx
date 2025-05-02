import React from 'react';

// Libraries
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

// Vectors
import { monochrome, polychrome } from './Vectors';

// Styles
import './Styles.scss';

type Size = 'large' | 'larger' | 'largest' | 'medium' | 'small';

type Props = React.ObjectHTMLAttributes<HTMLObjectElement> & {
  src?:
    | (typeof monochrome.Names)[keyof typeof monochrome.Names]
    | (typeof polychrome.Names)[keyof typeof polychrome.Names];
  size?: Size;
};

const CLASS_NAME = 'kicl--icons--company';

const CompanyNames = {
  monochrome: monochrome.Names,
  polychrome: polychrome.Names,
};

const CompanyVectors = {
  monochrome: monochrome.Vectors,
  polychrome: polychrome.Vectors,
};

const Company: React.FunctionComponent<Props> = ({
  className: _className,
  src: _src,
  size,
  ...props
}) => {
  const className = classNames(
    CLASS_NAME,
    {
      [`${CLASS_NAME}--font-size--${size}`]: size,
    },
    _className
  );

  if (!_src) {
    return null;
  }

  const monochrome = CompanyVectors.monochrome[_src];
  const polychrome = CompanyVectors.polychrome[_src];

  if (!monochrome && !polychrome) {
    return null;
  }

  if (polychrome) {
    return (
      <figure {...props} className={className}>
        <img alt={polychrome} data-src={polychrome} src={polychrome} />
      </figure>
    );
  }

  return (
    <object {...props} className={className}>
      <ReactSVG src={monochrome} />
    </object>
  );
};

export { type Props, CompanyNames, CompanyVectors };
export default Company;

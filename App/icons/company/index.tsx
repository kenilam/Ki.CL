import React from 'react';

// Libraries
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';

// Vectors
import { monochrome, polychrome } from './vectors';

// Styles
import './styles.scss';

type Size = 'large' | 'larger' | 'largest' | 'medium' | 'small';

type Name =
  | (typeof monochrome.Names)[keyof typeof monochrome.Names]
  | (typeof polychrome.Names)[keyof typeof polychrome.Names];

// Only what both an `img` and the injected SVG's wrapper take.
type Props = Pick<
  React.HTMLAttributes<HTMLElement>,
  'className' | 'id' | 'title'
> & {
  alt?: string;
  src?: Name;
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

// `epicGames` → `Epic Games`, for when no `alt` is given.
const toLabel = (name: string) =>
  name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase());

const Company: React.FunctionComponent<Props> = ({
  alt,
  className: _className,
  src: _src,
  size,
  ...props
}) => {
  const className = classNames(
    CLASS_NAME,
    'kicl-display-inline-block',
    'kicl-line-height-narrower',
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

  const label = alt ?? toLabel(_src);

  if (polychrome) {
    return (
      <img {...props} alt={label} className={className} src={polychrome} />
    );
  }

  return (
    <ReactSVG
      {...props}
      beforeInjection={(svg) => {
        svg.setAttribute('aria-label', label);
        svg.setAttribute('role', 'img');
      }}
      className={className}
      src={monochrome}
      wrapper='span'
    />
  );
};

export { CompanyNames, CompanyVectors, Company, type Props };

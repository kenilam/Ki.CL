import resources from '$/resources';
import {Link} from '@/Component';
import classnames from 'classnames';
import React from 'react';
import ILogo from './spec';
import Style from './Style';

const {
  siteName,
  view: {
    home: {path}
  }
} = resources;

const Logo: React.FunctionComponent<ILogo.Props> = ({isSquare}) => {
  const className = classnames({
    [Style.square]: isSquare
  });
  
  return (
    <h1 data-component={Style.default} className={className}>
      <Link to={path}>{siteName}</Link>
    </h1>
  );
};

Logo.defaultProps = {
  isSquare: false
};

export default Logo;

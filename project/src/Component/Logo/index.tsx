import resources from '$/resources';
import {Link} from '@/Component';
import classnames from 'classnames';
import React from 'react';
import ILogo from './spec';
import Style from './Style';

const {
  component: {
    logo: {content: {message, title}}
  },
  view: {
    home: {path}
  }
} = resources;

const Logo: React.FunctionComponent<ILogo.Props> = ({isSquare}) => {
  const className = classnames({
    [Style.square]: isSquare
  });
  
  return (
    <h1 data-component={Style.default} className={className} title={title}>
      <Link to={path}>{message}</Link>
    </h1>
  );
};

Logo.defaultProps = {
  isSquare: false
};

export default Logo;

import { data } from '$/resources';
import { Link } from '@/Component'
import classnames from 'classnames';
import React from 'react';
import Style from './Style';
import { Props } from './spec';

const {
  component: {
    logo: {
      content: {
        message,
        title
      }
    }
  },
  view: {
    home: { path },
  },
} = data;

const Logo: React.FunctionComponent<Props> = ({ isSquare }) => {
  const className = classnames({
    [Style.square]: isSquare,
  });

  return (
    <h1 data-component={Style.default} className={className} title={title}>
      <Link to={path}>{message}</Link>
    </h1>
  );
};

Logo.defaultProps = {
  isSquare: false,
};

export default Logo;

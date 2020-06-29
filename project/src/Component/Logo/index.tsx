import resources from '$/resources';
import { Link } from '@/Component'
import classnames from 'classnames';
import React from 'react';
import Style from './Style';
import Spec from './spec';

const {
  component: {
    logo,
  },
  view: {
    home: { path },
  },
} = resources;

const content = logo.content as { message: string, title: string };
const message = content.message as string;
const title = content.title as string;

const Logo: React.FunctionComponent<Spec.Props> = ({ isSquare }) => {
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

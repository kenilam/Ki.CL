import {siteName, view} from '$resources/data.json';
import {Link} from '@Component';
import classnames from 'classnames';
import React from 'react';
import * as ILogo from './spec';
import Style from './Style';

const {home: {path}} = view;

const Logo: React.FC<ILogo.Props> = ({
  className: additionalClassName,
  component = 'h1'
}) => (
  <Link
    to={path}
    className={classnames(Style.logo, additionalClassName)}
    component={component}
  >
    {siteName}
  </Link>
);

export default Logo;

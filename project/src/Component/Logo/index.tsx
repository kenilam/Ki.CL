import resources from '$/resources';
import {Link} from '@/Component';
import React from 'react';
import * as ILogo from './spec';
import Style from './Style';

const {
  siteName,
  view: {
    home: { path }
  }
} = resources;

const Logo: React.FunctionComponent<ILogo.Props> = () => (
  <h1 data-component={Style.default}>
    <Link
      to={path}
    >
      {siteName}
    </Link>
  </h1>
);

export default Logo;

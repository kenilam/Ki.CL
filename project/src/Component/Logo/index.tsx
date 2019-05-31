import {siteName, view} from '$resources/data.json';
import {Link} from '@Component';
import React from 'react';
import * as ILogo from './spec';
import Style from './Style';

const {home: {path}} = view;

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

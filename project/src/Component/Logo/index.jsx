// @flow
import React from 'react';

import classnames from 'classnames';

import { Link } from 'Component';

import { Connector } from './State';

import './style.scss';

type Props = {
  className: {} | Array | String,
  path: string,
  siteName: string
};

const Logo = ({ className, path, siteName }: Props) => (
  <Link to={path} text={siteName} component='h1' className={ classnames(className, 'logo') } />
);

export default Connector(Logo);

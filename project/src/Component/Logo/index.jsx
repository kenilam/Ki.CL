import React from 'react';

import { Link } from 'Component';

import { Connector } from './State';

import './style.scss';

const Logo = ({ path, siteName }) => (
    <Link to={path} text={siteName} component="h1" className="logo" />
);

const Component = Connector(Logo);

export default Component;

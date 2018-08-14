// @flow
import React from 'react';

import { Link } from 'Component';

import { Connector } from './State';

import './style.scss';

type Props = {
    path: string,
    siteName: string
};

const Logo = ({ path, siteName }: Props) => (
    <Link to={path} text={siteName} component="h1" className="logo" />
);

const Component = Connector(Logo);

export default Component;

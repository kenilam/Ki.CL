// @flow
import React from 'react';

import { Nav } from 'Component';

import { Connector } from './State';

import './style.scss';

const Navigation = ({ onClick, routes }) => (
  <Nav className='css-transition-element' {...{ onClick, routes }} />
);

const Component = Connector(Navigation);

export default Component;

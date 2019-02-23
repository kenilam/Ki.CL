// @flow
import React from 'react';

import { Router } from 'Component';

import Work from './Work';

import './style';

const routeIndex = 2;

const View = () => {
  const onEnter = ({ location, node }) => {
    console.log(location, node);
  };

  return (
    <Router routeIndex={routeIndex} onEnter={onEnter}>
      {Work}
    </Router>
  );
};

export default View;

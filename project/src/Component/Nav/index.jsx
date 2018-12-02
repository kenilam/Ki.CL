// @flow
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import classnames from 'classnames';

import { Link } from 'Component';
import { randomId } from 'Helper';

import './style.scss';

type route = {
  name: string,
  path: string
};

type Props = {
  onClick: Function,
  routes: Array<route>
};

const Nav = ({ className, onClick, routes }: Props) => (
  <Router>
    <nav className={ classnames(className, 'navigation') }>
      {routes.map(({ name, path }) => (
        <Link to={path} text={name} key={randomId} {...{ onClick }} />
      ))}
    </nav>
  </Router>
);

export default Nav;

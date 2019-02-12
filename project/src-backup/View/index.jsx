// @flow
import React from 'react';

import { Router } from 'Component';
import { path } from 'Component/Router/Utilities';

import About from './About';
import Contact from './Contact';
import Home from './Home';
import Works from './Works';

import './style.scss';

type Props = {
  className?: String,
  style: Array | String | {},
  transitionStyle: String
};

const View = ({ className, style, transitionStyle, ...rest }: Props) => (
  <Router { ...{ className, transitionStyle, style } }
    onEnter={ ({ location }) => {
      const routes = path.notationise(location.pathname, 1);

      body.dataset.enteredRoute = routes;
    } }
    onExit={ ({ location }) => {
      const routes = path.notationise(location.pathname, 1);
      
      body.dataset.exitedRoute = routes;
    } }
  >
    {About(rest)}
    {Contact(rest)}
    {Home(rest)}
    {Works(rest)}
  </Router>
);

View.defaultProps = {
  className: 'view'
}

export default View;

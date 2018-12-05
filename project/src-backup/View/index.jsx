// @flow
import React from 'react';

import { Router } from 'Component';

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
  <Router { ...{ className, transitionStyle, style } }>
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

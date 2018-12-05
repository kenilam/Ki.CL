import React from 'react';

import IcoMoon from 'react-icomoon';

import { component } from 'content/resources';

const { content } = component.loader;
const { description } = content;

import './style.scss';

const Loader = () => (
  <p className='loader' aria-label={ description }>
    <IcoMoon
      className='spinner'
      icon='spinner8'
    />
    <span>{ description }</span>
  </p>
);

export default Loader;

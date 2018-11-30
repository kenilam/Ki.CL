import React from 'react';

import IcoMoon from 'react-icomoon';

import { Connector } from './State';

import './style.scss';

const Loader = ({ content }) => {
  const { description } = content;
  return (
    <p className='loader' aria-label={ description }>
      <IcoMoon
        className='spinner'
        icon='spinner8'
      />
      <span>{ description }</span>
    </p>
  )
};

export default Connector(Loader);

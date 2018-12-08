// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';

import { component } from 'content/resources';

const { content } = component.loader;

import './style.scss';

type Props = {
  iconOnly: Boolean,
  text: String
};

const Loader = ({ iconOnly, text }: Props) => (
  <p className='loader' aria-label={ text || content.default.text }>
    <IcoMoon
      className='spinner'
      icon='spinner8'
    />
    { !iconOnly && <span>{ text || content.default.text }</span> }
  </p>
);

export default Loader;

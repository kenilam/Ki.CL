// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';
import Fittext from 'react-fittext';

import { component } from 'content/resources';

const { content } = component.loader;

import './style.scss';

type Props = {
  iconOnly?: Boolean,
  text?: String
};

const Loader = ({ iconOnly, text }: Props) => (
  <Fittext>
    <p className='loader' aria-label={ text }>
      <IcoMoon
        className='spinner'
        icon='spinner8'
      />
      { !iconOnly && <span>{ text }</span> }
    </p>
  </Fittext>
);

Loader.defaultProps = {
  iconOnly: false,
  text: content.default.text
}

export default Loader;

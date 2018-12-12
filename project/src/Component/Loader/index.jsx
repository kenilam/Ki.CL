// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';
import Fittext from 'react-fittext';

import { cssUnit } from 'Helper';

import { component } from 'content/resources';

import { maxFontSize } from './style.scss';

type Props = {
  iconOnly?: Boolean,
  text?: String
};

const { content } = component.loader;

const Loader = ({ iconOnly, text }: Props) => (
  <Fittext maxFontSize={ cssUnit(maxFontSize) }>
    <p className='loader' aria-label={ text }>
      <span>
      <IcoMoon
        className='spinner'
        icon='spinner8'
      />
      <IcoMoon
        className='spinner'
        icon='spinner8'
      />
      </span>
      { !iconOnly && <span className='text'>{ text }</span> }
    </p>
  </Fittext>
);

Loader.defaultProps = {
  iconOnly: false,
  text: content.default.text
}

export default Loader;

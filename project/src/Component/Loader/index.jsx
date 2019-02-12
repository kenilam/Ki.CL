// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';
import Fittext from 'react-fittext';

import { CSSTransition } from 'Component';
import { cssUnit } from 'Helper';

import { component } from 'content/resources';

import { maxFontSize } from './style.scss';

type Props = {
  iconOnly?: Boolean,
  show?: Boolean,
  text?: String
};

const { loader: { content } } = component;

const Spiner = () => <IcoMoon className='spinner' icon='spinner8'/>;

const Loader = ({ iconOnly, show, text }: Props) => (
  <CSSTransition transitionIn={ show }>
    <Fittext maxFontSize={ cssUnit(maxFontSize) }>
      <p className='loader' aria-label={ text }>
        <span>
          <Spiner/>
          <Spiner/>
        </span>
        { !iconOnly && <span className='text'>{ text }</span> }
      </p>
    </Fittext>
  </CSSTransition>
);

Loader.defaultProps = {
  iconOnly: false,
  show: true,
  text: content.default.text
}

export default Loader;

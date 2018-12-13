// @flow
import React from 'react';

import IcoMoon from 'react-icomoon';
import Fittext from 'react-fittext';

import { CSSTransition } from 'Component';
import { cssUnit } from 'Helper';

import { component } from 'content/resources';

import State, { Connector } from './State';

import { maxFontSize } from './style.scss';

type Props = {
  iconOnly?: Boolean,
  show?: Boolean,
  text?: String
};

const { content } = component.loader;

const Spiner = () => <IcoMoon className='spinner' icon='spinner8'/>;

const Loader = ({ iconOnly, show, showComponent, text }: Props) => {
  showComponent();

  return (
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
};

const Instance = Connector(Loader);

const Component = props => (
  <State>
    <Instance { ...props } />
  </State>
);

Loader.defaultProps = {
  iconOnly: false,
  show: false,
  text: content.default.text
}

export default Component;

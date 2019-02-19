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
  message?: String
};

const {
  loader: {
    content: {
      default: {
        message
      }
    }
  }
} = component;

const Spinner = ({ iconOnly, show, message }: Props) => (
  <CSSTransition transitionIn={ show }>
    <Fittext maxFontSize={ cssUnit(maxFontSize) }>
      <div className='spinner' aria-label={ message }>
        <div>
          <IcoMoon icon='spinner8'/>
          <IcoMoon icon='spinner8'/>
        </div>
        { !iconOnly && <p className='text'>{ message }</p> }
      </div>
    </Fittext>
  </CSSTransition>
);

Spinner.defaultProps = {
  iconOnly: false,
  show: true,
  message
}

export default Spinner;

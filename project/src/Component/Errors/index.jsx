import React from 'react';

import { CSSTransition } from 'Component';

import './style.scss';

type Props = {
  errors?: {
    message: String,
    stack: String
  },
  onError: React.Node | Function,
  show?: Boolean
};

const Errors = ({ errors, onError, show }: Props) => (
  onError
    ? onError()
    : (
      <CSSTransition transitionIn={ show }>
        <div className='errors'>
          <h1>{errors.message}</h1>
          <p>{errors.stack}</p>
        </div>
      </CSSTransition>
    )
);

Errors.defaultProps = {
  errors: {},
  show: true
}

export default Errors;

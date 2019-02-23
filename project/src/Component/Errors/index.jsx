// @flow
import React from 'react';

import { CSSTransition } from 'Component';
import { isEmpty } from 'Helper';

import './style';

type Props = {
  errors?: {
    message: String,
    stack: String
  },
  onError: React.Node | Function,
  show?: Boolean
};

const Errors = ({ errors, onError, show }: Props) => {
  if (isEmpty(errors)) {
    return null;
  }

  if (onError) {
    return onError({ errors });
  }

  return (
    <CSSTransition transitionIn={show}>
      <div className="errors">
        <h1>{errors.message}</h1>
        <p>{errors.stack}</p>
      </div>
    </CSSTransition>
  );
};

Errors.defaultProps = {
  errors: {},
  show: true
};

export default Errors;

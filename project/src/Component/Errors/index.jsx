import React from 'react';

import './style.scss';

type Props = {
  errors?: {
    message: String,
    stack: String
  }
};

const Errors = ({ errors }: Props) => (
  <div className='errors'>
    <h1>{errors.message}</h1>
    <p>{errors.stack}</p>
  </div>
);

Errors.defaultProps = {
  errors: {}
}

export default Errors;

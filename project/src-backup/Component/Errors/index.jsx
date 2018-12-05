import React from 'react';

import './style.scss';

const Errors = ({ errors }) => (
  <div className='errors'>
    <h1>{errors.message}</h1>
    <p>{errors.stack}</p>
  </div>
);

export default Errors;

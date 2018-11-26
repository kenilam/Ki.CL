import React from 'react';

const Errors = ({ errors }) => (
  <React.Fragment>
    <h1>{errors.message}</h1>
    <p>{errors.stack}</p>
  </React.Fragment>
);

export default Errors;

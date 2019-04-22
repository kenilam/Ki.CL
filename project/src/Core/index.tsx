import {history} from '@Hook';
import React from 'react';
import {loadPolyfill} from './Polyfill';

import {IProps} from './spec';

import './Style';

const Core = ({children}: IProps) => {
  history();
  
  return (
    <>
      {children}
    </>
  );
};

export {loadPolyfill};
export default Core;

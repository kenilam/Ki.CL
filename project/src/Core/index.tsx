import React, { useLayoutEffect } from 'react';
import History from './History';
import State from './State';
import { loadPolyfill } from './Polyfill';

import './Style';

import { IProps } from './spec';

const Core = ({ children }: IProps) => {
  useLayoutEffect(() => {
    History.create();

    return () => {
      History.remove();
    }
  });

  return (
    <State>{children}</State>
  )
}

export { loadPolyfill };
export default Core;

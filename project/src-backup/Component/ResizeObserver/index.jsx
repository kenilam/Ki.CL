// @flow

import React from 'react';
import Observer from 'reactjs-resize-observer';

const ResizeObserver = ({ children, resizeHandler }) => {
  const onResize = entry => {
    const rect = entry.target.getBoundingClientRect();
    
    resizeHandler(rect);
  }

  return (
    <Observer onResize={ onResize } }>
      {children}
    </Observer>
  );
}

export default ResizeObserver;

import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

// Context
import { useGlobalHeaderContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const CssVariables: React.FunctionComponent = () => {
  const { rect, show } = useGlobalHeaderContext();

  /*
   * Hiding ends in `display: none`, which measures as 0px. Keep the last real
   * height so the content that clears the header doesn't jump when it hides.
   * The offset is how much of the window the header covers right now, for
   * content that should follow it, like `Frame`.
   */
  const blockSize = useRef(0);

  if (rect?.height) {
    blockSize.current = rect.height;
  }

  return ReactDOM.createPortal(
    <style data-widget-global-header-uuid={`${CLASS_NAME}--css-variables`}>
      {`:root {
          --${CLASS_NAME}--block-size: ${blockSize.current}px;
          --${CLASS_NAME}--offset: ${show ? blockSize.current : 0}px;
        }`}
    </style>,
    window.document.body
  );
};

export { CssVariables };

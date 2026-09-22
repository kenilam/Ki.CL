import React from 'react';
import ReactDOM from 'react-dom';

// Context
import { useGlobalHeaderContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const CssVariables: React.FunctionComponent = () => {
  const { rect } = useGlobalHeaderContext();

  return ReactDOM.createPortal(
    <style data-widget-global-header-uuid={`${CLASS_NAME}--css-variables`}>
      {`:root {
          --${CLASS_NAME}--block-size: ${rect?.height || 0}px;
        }`}
    </style>,
    window.document.body
  );
};

export { CssVariables };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame } from 'design/components';

// Partials
import { Alert } from './alert';
import { Notice } from './notice';
import { Remove } from './remove';
import { Scene } from './scene';

// Constants
import { CLASS_NAME } from '@/views/experiments/factory-arm/constants';

const Stage: React.FunctionComponent = () => {
  return (
    <>
      <Frame>
        {/* The frame's own element: the canvas sizes itself to fill it, and the overlays sit over the canvas in its coordinates. */}
        <figure
          className={classNames(
            CLASS_NAME,
            // Dragging turns the view and pinching zooms it, so the page must not.
            'kicl-overscroll-behavior-none',
            'kicl-position-relative',
            'kicl-touch-action-none',
            'kicl-user-select-none'
          )}
        >
          <Scene />
          <Notice />
          <Remove />
        </figure>
      </Frame>

      <Alert />
    </>
  );
};

export { Stage };

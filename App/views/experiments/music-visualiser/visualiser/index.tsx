import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { usePicture } from './use-picture';

// Context
import { Provider } from './context';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** The picture: a canvas the size of the view, drawn by the scene shader. */
const Visualiser: React.FunctionComponent = () => {
  const node = usePicture();

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-full',
        'kicl-inline-size-full',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      ref={node}
    />
  );
};

export { Provider, Visualiser };

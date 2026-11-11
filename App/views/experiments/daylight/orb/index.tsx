import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from 'design/hooks';
import { useOrb } from './use-orb';

// Context
import { Provider } from './context';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__orb`;

/**
 * The drawing: a canvas the size of the view, drawn by one shader. It can be
 * dragged to turn the globe, and a place on it can be clicked. What it shows is also in the list of places, so
 * it is hidden from assistive tech.
 */
const Orb: React.FunctionComponent = () => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const { handlers, over } = useOrb({
    canvas: node.current,
    height: rect?.height ?? 0,
    width: rect?.width ?? 0,
  });

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-full',
        over ? 'kicl-cursor-pointer' : 'kicl-cursor-grab',
        'kicl-inline-size-full',
        'kicl-inset-0',
        'kicl-position-absolute',
        'kicl-touch-action-none'
      )}
      ref={node}
      {...handlers}
    />
  );
};

export { Orb, Provider };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from 'design/hooks';
import { useOrb } from './use-orb';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__orb`;

type Props = Omit<Parameters<typeof useOrb>[0], 'canvas' | 'height' | 'width'>;

/**
 * The drawing: a canvas the size of the view, drawn by one shader. It can be
 * dragged to turn the globe. What it shows is also in the list of places, so
 * it is hidden from assistive tech.
 */
const Orb: React.FunctionComponent<Props> = (props) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const handlers = useOrb({
    ...props,
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
        'kicl-cursor-grab',
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

export { Orb };

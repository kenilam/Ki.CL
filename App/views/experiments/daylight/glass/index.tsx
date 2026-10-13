import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from 'design/hooks';
import { useGlass } from './use-glass';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__glass`;

type Props = Omit<
  Parameters<typeof useGlass>[0],
  'canvas' | 'height' | 'width'
>;

/**
 * The window: a canvas the size of the view, drawn by one shader. It can be
 * dragged to turn the globe. What it shows is also in the list of places, so
 * it is hidden from assistive tech.
 */
const Glass: React.FunctionComponent<Props> = (props) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const handlers = useGlass({
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

export { Glass };

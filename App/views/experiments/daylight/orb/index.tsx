import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver, useResponsive } from 'design/hooks';
import { useOrb } from './use-orb';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/daylight/constants';

const CLASS_NAME = `${VIEW}__orb`;

type Props = Omit<
  Parameters<typeof useOrb>[0],
  'canvas' | 'height' | 'light' | 'width'
>;

/**
 * The drawing: a canvas the size of the view, drawn by one shader. It can be
 * dragged to turn the globe, and a place on it can be clicked. What it shows is also in the list of places, so
 * it is hidden from assistive tech.
 */
const Orb: React.FunctionComponent<Props> = (props) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();
  const { theme } = useResponsive();
  const { handlers, over } = useOrb({
    ...props,
    canvas: node.current,
    height: rect?.height ?? 0,
    light: theme === 'light',
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

export { Orb };

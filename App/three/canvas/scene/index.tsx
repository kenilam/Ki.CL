import React, { useRef, useState } from 'react';

// Libraries
import classNames from 'classnames';
import type * as Fiber from '@react-three/fiber';

// Hooks
import { useRoot } from './use-root';
import { useSize } from './use-size';

type Props = Pick<
  Fiber.RenderProps<HTMLCanvasElement>,
  'camera' | 'dpr' | 'frameloop' | 'gl' | 'shadows'
> &
  React.ComponentPropsWithoutRef<'canvas'> & {
    children: React.ReactNode;
  };

const Scene: React.FunctionComponent<Props> = ({
  camera,
  children,
  className,
  dpr,
  frameloop,
  gl,
  shadows,
  ...rest
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const size = useSize(canvas);
  const [error, setError] = useState<unknown>(null);

  if (error) {
    throw error;
  }

  useRoot(canvas, {
    camera,
    children,
    dpr,
    frameloop,
    gl,
    onError: setError,
    shadows,
    size: size ?? undefined,
  });

  return (
    <canvas
      {...rest}
      className={classNames('kicl-display-block', className)}
      ref={canvas}
    />
  );
};

export { Scene };

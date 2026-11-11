import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from 'react';

// Libraries
import * as THREE from 'three';
import * as Fiber from '@react-three/fiber';
import { useContextBridge } from 'its-fine';

// Partials
import { Catch } from './catch';

type Options = Pick<
  Fiber.RenderProps<HTMLCanvasElement>,
  'camera' | 'dpr' | 'frameloop' | 'gl' | 'shadows' | 'size'
> &
  React.ComponentProps<typeof Catch>;

const useRoot = (
  canvas: RefObject<HTMLCanvasElement | null>,
  { camera, children, dpr, frameloop, gl, onError, shadows, size }: Options
) => {
  const Bridge = useContextBridge();
  const root = useRef<Fiber.ReconcilerRoot<HTMLCanvasElement> | null>(null);

  useLayoutEffect(() => {
    const element = canvas.current;

    if (!element || !size || !size.width || !size.height) {
      return;
    }

    if (!root.current) {
      Fiber.extend(THREE as unknown as Parameters<typeof Fiber.extend>[0]);
      root.current = Fiber.createRoot(element);
    }

    const current = root.current;

    void current
      .configure({
        camera,
        dpr,
        events: Fiber.events,
        frameloop,
        gl,
        onCreated: (state) => state.events.connect?.(element),
        shadows,
        size,
      })
      .then(() =>
        current.render(
          <Bridge>
            <Catch onError={onError}>
              <Suspense fallback={null}>{children}</Suspense>
            </Catch>
          </Bridge>
        )
      );
  });

  useEffect(() => {
    const element = canvas.current;

    return () => {
      if (element) {
        Fiber.unmountComponentAtNode(element);
      }
    };
  }, [canvas]);
};

export { useRoot };

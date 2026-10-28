import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

// Libraries
import classNames from 'classnames';
import * as THREE from 'three';
import * as Fiber from '@react-three/fiber';
import { FiberProvider, useContextBridge } from 'its-fine';

type Props = Pick<
  Fiber.RenderProps<HTMLCanvasElement>,
  'camera' | 'dpr' | 'gl' | 'shadows'
> &
  React.ComponentPropsWithoutRef<'canvas'> & {
    children: React.ReactNode;
  };

type Size = { height: number; left: number; top: number; width: number };

class Catch extends React.Component<
  React.PropsWithChildren<{ onError: (error: unknown) => void }>,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const Scene: React.FunctionComponent<Props> = ({
  camera,
  children,
  className,
  dpr,
  gl,
  shadows,
  ...rest
}) => {
  const Bridge = useContextBridge();
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const root = useRef<Fiber.ReconcilerRoot<HTMLCanvasElement> | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [error, setError] = useState<unknown>(null);

  if (error) {
    throw error;
  }

  useLayoutEffect(() => {
    const parent = canvas.current?.parentElement;

    if (!parent) {
      return undefined;
    }

    const measure = () => {
      const { left, top } = parent.getBoundingClientRect();

      setSize({
        height: parent.clientHeight,
        left,
        top,
        width: parent.clientWidth,
      });
    };

    const observer = new ResizeObserver(measure);

    observer.observe(parent);
    measure();

    return () => observer.disconnect();
  }, []);

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
        gl,
        onCreated: (state) => state.events.connect?.(element),
        shadows,
        size,
      })
      .then(() =>
        current.render(
          <Bridge>
            <Catch onError={setError}>
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
  }, []);

  return (
    <canvas
      {...rest}
      className={classNames('kicl-display-block', className)}
      ref={canvas}
    />
  );
};

const Canvas: React.FunctionComponent<Props> = (props) => (
  <FiberProvider>
    <Scene {...props} />
  </FiberProvider>
);

export { Canvas };

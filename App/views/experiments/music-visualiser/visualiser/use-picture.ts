import { useEffect } from 'react';

// Hooks
import { useResizeObserver } from 'design/hooks';
import { useStage } from './use-stage';

// Context
import { useVisualiserContext } from './context';

// Constants
import { CLASS_NAME } from './constants';

const usePicture = () => {
  const { analyser, onCanvas, playing, track } = useVisualiserContext();
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();

  useEffect(() => {
    onCanvas?.(node.current);

    return () => onCanvas?.(null);
  }, [node, onCanvas]);

  useStage({
    analyser,
    canvas: node.current,
    height: rect?.height ?? 0,
    playing,
    property: `--${CLASS_NAME}`,
    track,
    width: rect?.width ?? 0,
  });

  return node;
};

export { usePicture };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResizeObserver } from '@/Hooks';
import useStage from './useStage';

// Styles
import './Styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/Views/Experiments/MusicVisualiser/constants';

const CLASS_NAME = `${VIEW}__stage`;

type Props = {
  analyser: AnalyserNode | null;
  playing: boolean;
  /** Changes when the track does. */
  track: string | null;
};

/** The picture: a canvas the size of the view, drawn by the scene shader. */
const Visualiser: React.FunctionComponent<Props> = ({
  analyser,
  playing,
  track,
}) => {
  const { node, rect } = useResizeObserver<HTMLCanvasElement>();

  useStage({
    analyser,
    canvas: node.current,
    height: rect?.height ?? 0,
    playing,
    property: `--${CLASS_NAME}`,
    track,
    width: rect?.width ?? 0,
  });

  return (
    <canvas
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      ref={node}
    />
  );
};

export default Visualiser;

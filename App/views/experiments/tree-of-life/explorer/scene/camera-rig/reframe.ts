import { THREE } from '@/three';

// Anchors
import { getAnchor } from '@/views/experiments/tree-of-life/explorer/scene/anchors';

// Constants
import { GRACE, STABLE_FRAMES } from './constants';

// Parts
import { settle } from './settle';
import type { Rig } from './use-rig';

type Props = Rig & {
  ancestorId: string | undefined;
  anchor: readonly [number, number, number];
  chains: string[];
  /** Seconds since the scene started. */
  elapsed: number;
  nodeId: string;
  offsetPx: number;
  perspective: THREE.PerspectiveCamera;
  size: { width: number; height: number };
};

/** Frames a new focus once its lineage is whole, or once the grace runs out. */
const reframe = (props: Props): void => {
  const {
    ancestorId,
    chains,
    departed,
    elapsed,
    framed,
    held,
    near,
    nodeId,
    placed,
    spin,
    tilt,
    travel,
    waiting,
    wanted,
    zoom,
  } = props;

  const ancestor = ancestorId ? getAnchor(ancestorId) : null;

  /*
   * Ready once the lineage is whole for a couple of frames. The chain
   * stops growing as soon as the walk reaches the root, even while the
   * fans around it are still mounting.
   */
  const whole =
    (ancestorId ? Boolean(ancestor) : true) &&
    chains.every((id) => getAnchor(id));

  placed.current = whole ? placed.current + 1 : 0;

  const ready = whole && placed.current >= STABLE_FRAMES;

  waiting.current ??= elapsed;

  if (ready || elapsed - waiting.current >= GRACE) {
    // The first framing has nothing to fly from, so it arrives composed.
    const first = framed.current === null;

    departed.current.target.copy(near.current.target);
    departed.current.bearing.copy(near.current.bearing);
    departed.current.distance = near.current.distance;

    settle({ ...props, ancestor });
    travel.current = first ? 1 : 0;
    held.current = 0;
    framed.current = nodeId;
    waiting.current = null;
    wanted.current = 0;
    zoom.current = 0;
    spin.current = 0;
    tilt.current = 0;
  }
};

export { reframe };

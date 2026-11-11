// Stage
import {
  indexAt,
  localOf,
  type Playhead,
} from '@/views/experiments/kinetic-light/stage/playhead';

type Shot = 'floor' | 'lines' | 'page' | 'sweep';

type Vector = [number, number, number];

type Rig = { position: Vector; target: Vector };

type Frame = { aspect: number; depth: number; distance: number; fov: number };

const SHOTS: readonly Shot[] = ['page', 'sweep', 'floor', 'lines'];
const PAGE_WIDTH = 9;
const PAGE_MARGIN = 1.4;
const PAGE_TILT = 0.35;
const DEPTH_FITS = 1.2;
const WIDE = 16 / 9;

const shotAt = (
  time: number,
  playhead: Playhead,
  cuts: readonly number[],
  still: boolean
): Shot => {
  if (still) {
    return 'page';
  }

  return SHOTS[
    Math.max(0, indexAt(cuts, localOf(time, playhead))) % SHOTS.length
  ];
};

const toRig = (shot: Shot, { aspect, depth, distance, fov }: Frame): Rig => {
  const narrow = Math.min(1, aspect / WIDE);
  const near = distance * Math.sqrt(narrow);
  const spread = Math.tan((fov * Math.PI) / 360);
  const scale = near * Math.max(1, depth / DEPTH_FITS);
  const front = depth / 2;
  const ahead = scale * narrow;

  if (shot === 'page') {
    const height = Math.max(
      (depth * PAGE_MARGIN) / (2 * spread),
      (PAGE_WIDTH * near) / (2 * spread * Math.max(aspect, WIDE))
    );

    return {
      position: [0, height, height * PAGE_TILT],
      target: [0, 0, 0],
    };
  }

  if (shot === 'sweep') {
    return {
      position: [-2.5 * scale, 1.8 * scale, front + 2.6 * scale],
      target: [1.5 * ahead, 0, 0],
    };
  }

  if (shot === 'floor') {
    return {
      position: [-1.6 * scale, 0.28 * scale, front + 1.4 * scale],
      target: [1.8 * ahead, 0.45 * scale, -0.2 * scale],
    };
  }

  return {
    position: [-3.2 * scale, 0.5 * scale, front * 0.3],
    target: [4 * ahead, 0.15 * scale, 0],
  };
};

export { shotAt, toRig, type Rig, type Shot };

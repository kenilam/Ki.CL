import { useRef } from 'react';

import { THREE } from '@/three';

/** A complete camera pose: what it looks at, from which side, and how far. */
type Pose = {
  target: THREE.Vector3;
  /** Unit vector from the target toward the camera. */
  bearing: THREE.Vector3;
  distance: number;
};

const pose = (): Pose => {
  return {
    target: new THREE.Vector3(),
    bearing: new THREE.Vector3(0, 0, 1),
    distance: 1,
  };
};

/**
 * Everything the rig remembers between frames. Input only writes `wanted`,
 * `spin` and `tilt`; the pose is read off them on the next frame.
 */
const useRig = () => {
  return {
    framed: useRef<string | null>(null),
    /** When the focus first appeared, so the grace has something to run from. */
    waiting: useRef<number | null>(null),
    /** Consecutive frames the lineage has been fully anchored. */
    placed: useRef(0),
    /** The pose the framing chose - the near end of the pull-back. */
    near: useRef<Pose>(pose()),
    /** The pose being flown from, so a route change travels instead of cutting. */
    departed: useRef<Pose>(pose()),
    travel: useRef(1),
    /** Frames since the last framing, so arrival is announced a beat late. */
    held: useRef(0),
    /** Scratch for the blended pose, so a flight allocates nothing per frame. */
    flying: useRef<Pose>(pose()),
    /** Where the wheel has put the zoom, and where the camera has caught up to. */
    wanted: useRef(0),
    zoom: useRef(0),
    /** Orbit the drag has added, applied on top of whatever the zoom produces. */
    spin: useRef(0),
    tilt: useRef(0),
    /**
     * How much of the drag is in effect, from 1 at the taxon to 0 at full
     * pull-back. Input is scaled by it, so a drag that can't turn the view
     * doesn't bank rotation for later.
     */
    hand: useRef(1),
    scratch: useRef(new THREE.Vector3()),
    upright: useRef(new THREE.Vector3()),
    facing: useRef(new THREE.Vector3()),
    lifted: useRef(new THREE.Vector3()),
    centre: useRef(new THREE.Vector3()),
    across: useRef(new THREE.Vector3()),
  };
};

type Rig = ReturnType<typeof useRig>;

export { type Rig, useRig };

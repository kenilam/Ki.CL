/*
 * Materials can't read CSS custom properties, so the floor keeps its own
 * palette. Keep it close to the site's neutrals, with one accent for the arms.
 */
const COLOURS = {
  ground: '#1c1d21',
  grid: '#34363d',
  cell: '#25272d',
  arm: '#f2a43a',
  /** An arm on the twin: physical AI drives it. */
  twinned: '#4fd18b',
  joint: '#3b3d44',
  pad: '#111214',
  belt: '#2b2d33',
  stripe: '#4a4d55',
  frame: '#6b6f78',
  pallet: '#b08a5a',
  wall: '#4b4e56',
  pillar: '#5d6068',
  post: '#e5c04b',
  worker: '#5aa0e6',
  skin: '#e9c9a8',
  amr: '#d9dadf',
  cases: {
    box: '#c9a27a',
    crate: '#7c8a5a',
    tub: '#4f7fbf',
    cylinder: '#b85c5c',
  },
} as const;

/** How many arms go to the twin when Physical AI is on: one per rig it has, the first arms on the floor. */
const TWINNED = 4;

/** The camera's lens; ./view.tsx places it to take in the floor. */
const CAMERA = { fov: 40 };

export { CAMERA, COLOURS, TWINNED };

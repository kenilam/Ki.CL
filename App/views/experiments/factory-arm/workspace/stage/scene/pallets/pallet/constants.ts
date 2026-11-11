// Three
import { THREE } from '@/three';

// Constants
import { PALLET } from '@/views/experiments/factory-arm/engine/layout';

// Helpers
import { tokenColor } from '@/helper';

const WOOD = new THREE.MeshStandardMaterial({
  color: tokenColor('orange-300'),
  roughness: 0.85,
});

const [WIDTH, HEIGHT, DEPTH] = PALLET.size;
const BOARD = 0.022;
const BLOCK = HEIGHT - BOARD * 3;

// Seven top boards across the depth, three rows of blocks and boards below.
const TOP = Array.from({ length: 7 }, (_, index) => {
  return (index / 6 - 0.5) * (DEPTH - 0.1);
});
const ROWS = [-0.5, 0, 0.5].map((row) => {
  return row * (DEPTH - 0.1);
});
const COLUMNS = [-0.5, 0, 0.5].map((column) => {
  return column * (WIDTH - 0.1);
});

export { BLOCK, BOARD, COLUMNS, DEPTH, HEIGHT, ROWS, TOP, WIDTH, WOOD };

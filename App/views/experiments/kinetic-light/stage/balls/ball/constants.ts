// Three
import { THREE } from '@/three';

const RADIUS = 0.06;
const SPREAD = 0.85;
const WHITE = new THREE.Color(1, 1, 1);
const CORE = 0.4;
const GLOW = 0.9;

const FLASH = 0.8;
const FLASH_SECONDS = 0.2;
const HALO = 0.28;
const HALO_GLOW = 0.15;
const TRAIL_SECONDS = 1.6;
const TRAIL_WIDTH = 0.045;
const TRAIL_GLOW = 1.8;
const MIRROR_GLOW = 0.08;
const MIRROR_WIDTH = TRAIL_WIDTH * 6;
const STREAK_WIDTH = 0.28;
const STREAK_LENGTH = 0.7;
const STREAK_GLOW = 0.3;

const DRIFT = new THREE.Vector3(0.08, 0.1, 0.05);
const DRIFT_SECONDS = 3.2;
const PAUSE_LIFT = 0.1;
const PAUSE_SWAY = 0.4;
const PAUSE_SETTLE = 3;
const PAUSE_SPEED = 0.5;

export {
  CORE,
  DRIFT,
  DRIFT_SECONDS,
  FLASH,
  FLASH_SECONDS,
  GLOW,
  HALO,
  HALO_GLOW,
  MIRROR_GLOW,
  MIRROR_WIDTH,
  PAUSE_LIFT,
  PAUSE_SETTLE,
  PAUSE_SPEED,
  PAUSE_SWAY,
  RADIUS,
  SPREAD,
  STREAK_GLOW,
  STREAK_LENGTH,
  STREAK_WIDTH,
  TRAIL_GLOW,
  TRAIL_SECONDS,
  TRAIL_WIDTH,
  WHITE,
};

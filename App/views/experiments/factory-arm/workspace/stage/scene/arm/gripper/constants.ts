// Constants
import { GRIPPER, LINK } from '@/views/experiments/factory-arm/engine/arm';

const QUARTER = Math.PI / 2;

// The housing runs from under the flange to just above the pad.
const TOP = 0.08 + GRIPPER.flange;
const HEIGHT = LINK.hand - GRIPPER.pad - TOP;
const MIDDLE = TOP + HEIGHT / 2;

// Its +y face points away from the base while the hand points down.
const FACE = GRIPPER.depth / 2;

export { FACE, HEIGHT, MIDDLE, QUARTER, TOP };

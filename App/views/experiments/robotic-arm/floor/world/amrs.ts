import { equals, fromPoint } from 'arm/grid';

import { DECK } from './layout';
import type { Amr, World } from './types';

/*
 * The AMR's drive and lift. It drives forward and turns as commanded. Raising
 * the deck under a pallet picks the pallet up; lowering it sets the pallet
 * down on the hex the AMR is over.
 */

/** A carried pallet sits square across the body, which drives along its own x. */
const ACROSS = -Math.PI / 2;

const lift = (world: World, amr: Amr) => {
  const under = fromPoint(amr.position);
  const pallet = world.pallets.find(
    (one) => !one.carrier && equals(fromPoint(one.position), under)
  );

  amr.lifted = true;

  if (pallet) {
    pallet.carrier = amr.id;
    amr.pallet = pallet.id;
  }
};

const lower = (world: World, amr: Amr) => {
  const pallet = world.pallets.find(({ id }) => id === amr.pallet);

  amr.lifted = false;
  amr.pallet = null;

  if (pallet) {
    pallet.carrier = null;
    pallet.position.y = 0;
  }
};

const runAmr = (world: World, amr: Amr, dt: number) => {
  const { command } = amr;

  if (command) {
    amr.heading += command.turn * dt;
    amr.position = {
      x: amr.position.x + Math.sin(amr.heading) * command.speed * dt,
      z: amr.position.z + Math.cos(amr.heading) * command.speed * dt,
    };

    if (command.lift && !amr.lifted) {
      lift(world, amr);
    } else if (!command.lift && amr.lifted) {
      lower(world, amr);
    }
  }

  const pallet = amr.pallet
    ? world.pallets.find(({ id }) => id === amr.pallet)
    : null;

  if (pallet) {
    pallet.position = { x: amr.position.x, y: DECK, z: amr.position.z };
    pallet.heading = amr.heading + ACROSS;
  }
};

export { ACROSS, runAmr };

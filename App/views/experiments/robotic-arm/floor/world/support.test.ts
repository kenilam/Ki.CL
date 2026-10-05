import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { layout } from '.';
import { supportUnder } from './support';
import type { Case } from './types';

const box = (id: string, x: number, z: number): Case => ({
  id,
  kind: 'box',
  size: [0.4, 0.3, 0.3],
  weight: 8,
  friction: 0.5,
  holder: { kind: 'floor' },
  position: { x, y: 0.3, z },
  heading: 0,
});

describe('support', () => {
  it('slides a case let go partly inside its neighbour out of it', () => {
    const world = layout();
    const [pallet] = world.pallets;
    const first = box('first', pallet.position.x, pallet.position.z);

    first.holder = supportUnder(world, first);
    world.cases.push(first);

    // Let go 8 cm into the first case, as a brain that misses its mark would.
    const second = box('second', pallet.position.x + 0.32, pallet.position.z);
    const holder = supportUnder(world, second);

    assert.equal(holder.kind, 'pallet');
    assert.ok(
      holder.kind === 'pallet' &&
        first.holder.kind === 'pallet' &&
        Math.abs(holder.u - first.holder.u) >= 0.4 - 1e-9,
      'the second case is still inside the first'
    );
  });

  it('leaves a case that lands clear where it lands', () => {
    const world = layout();
    const [pallet] = world.pallets;
    const first = box('first', pallet.position.x - 0.3, pallet.position.z);

    first.holder = supportUnder(world, first);
    world.cases.push(first);

    const holder = supportUnder(
      world,
      box('second', pallet.position.x + 0.2, pallet.position.z)
    );

    assert.ok(holder.kind === 'pallet' && Math.abs(holder.u - 0.2) < 1e-9);
  });
});

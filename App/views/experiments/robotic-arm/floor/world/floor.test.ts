import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { classic } from 'arm/brains';
import { equals, fromPoint } from 'arm/grid';

import { layout, map, sense, step, type World } from '.';

/*
 * The whole floor without a page: the plant and the classic brains from the
 * arm remote's source in one process, ticking the bus every step, as the
 * workers would. Needs Ki.CL-arm checked out beside this repo.
 */
const run = (seconds: number, check?: (world: World) => void) => {
  const world = layout();
  const blocked = map(world);
  const brains = new Map([
    ...world.arms.map(
      ({ id }) => [id, classic({ type: 'attach', robot: 'arm', id })] as const
    ),
    ...world.amrs.map(
      ({ id }) =>
        [
          id,
          classic({ type: 'attach', robot: 'amr', id, config: { blocked } }),
        ] as const
    ),
  ]);
  const dt = 1 / 50;

  for (let tick = 0; tick * dt < seconds; tick++) {
    step(world, dt);
    sense(world, tick).forEach((frame) => {
      const command = brains.get(frame.id)?.(frame);

      if (command?.robot === 'arm') {
        world.arms.find(({ id }) => id === frame.id)!.command = command;
      } else if (command?.robot === 'amr') {
        world.amrs.find(({ id }) => id === frame.id)!.command = command;
      }
    });
    check?.(world);
  }

  return world;
};

/** How far two cases may share a face and still count as apart. */
const TOUCH = 0.002;

/** Half a placed case's size along a floor axis, for a case square to the floor. */
const extent = ({ heading, size }: World['cases'][number], axis: number) => {
  const turned = Math.abs(Math.sin(heading)) > 0.5;

  return (
    (axis === 1 ? size[1] : (axis === 0) !== turned ? size[0] : size[2]) / 2
  );
};

const onPallets = (world: World) =>
  world.cases.filter(({ holder }) => holder.kind === 'pallet');

describe('floor', () => {
  it('moves cases from the belts onto the pallets', () => {
    const world = run(90);

    assert.ok(
      onPallets(world).length >= 6,
      `${onPallets(world).length} placed`
    );
    assert.equal(
      world.cases.filter(({ holder }) => holder.kind === 'floor').length,
      0,
      'a case was dropped on the floor'
    );
  });

  it('holds the belt until a picked case is lifted clear of the next', () => {
    const along = new Map<string, number>();
    let through = 0;
    let backwards = 0;

    run(120, (world) => {
      world.cases.forEach(({ holder, id }) => {
        if (holder.kind === 'belt') {
          backwards += holder.along < (along.get(id) ?? 0) - 1e-9 ? 1 : 0;
          along.set(id, holder.along);
        }
      });

      const lifted = world.cases.filter(({ holder }) => holder.kind === 'pad');
      const waiting = world.cases.filter(
        ({ holder }) => holder.kind === 'belt'
      );

      if (
        lifted.some((a) =>
          waiting.some((b) =>
            [0, 1, 2].every(
              (axis) =>
                Math.abs(
                  [a.position.x, a.position.y, a.position.z][axis] -
                    [b.position.x, b.position.y, b.position.z][axis]
                ) <
                extent(a, axis) + extent(b, axis) - TOUCH
            )
          )
        )
      ) {
        through += 1;
      }
    });

    assert.equal(
      through,
      0,
      `a lifted case went through a belt case ${through} times`
    );
  });

  it('never stacks a case inside another', () => {
    const world = run(120);
    const placed = onPallets(world);

    placed.forEach((a) =>
      placed.forEach((b) => {
        if (a === b) {
          return;
        }

        const apart = [
          [a.position.x, b.position.x, 0],
          [a.position.y, b.position.y, 1],
          [a.position.z, b.position.z, 2],
        ].some(
          ([p, q, axis]) =>
            Math.abs(p - q) >= extent(a, axis) + extent(b, axis) - TOUCH
        );

        assert.ok(apart, `${a.id} and ${b.id} overlap`);
      })
    );
  });

  it('sends the AMR for a full pallet and brings it back empty', () => {
    const fetched = new Set<string>();
    let returned = false;

    run(400, (now) => {
      now.pallets.forEach(({ carrier, home, id, position }) => {
        if (carrier) {
          fetched.add(id);
        } else if (
          fetched.has(id) &&
          equals(fromPoint(position), home) &&
          !now.cases.some(
            ({ holder }) => holder.kind === 'pallet' && holder.pallet === id
          )
        ) {
          returned = true;
        }
      });
    });

    assert.ok(fetched.size, 'no pallet was ever fetched');
    assert.ok(returned, 'no fetched pallet came back empty');
  });
});

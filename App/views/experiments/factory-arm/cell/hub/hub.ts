// Protocol
import type { Box, Link } from '../protocol';

// Grid
import {
  centre,
  type Hex,
  index,
  neighbour,
  opposite,
  parse,
  SIDES,
} from '../grid/hex';
import {
  apart,
  beside,
  covers,
  extended,
  layout,
  line as geometry,
  type Line as Geometry,
  on,
  reaches,
  stretch,
} from '../grid/layout';

// Station
import { ROOM } from '../station/constants';
import type { Event, Rider } from '../station/events';
import type { Case } from '../station/spec';
import { create as station, type Station } from '../station/station';

// Partials
import type { Board, Capacity, Target } from './board';

/** One arm in one cell of the grid. */
type Cell = { hex: Hex; arm: string };

/** A belt line, by the cells it's laid past, in a row: any arm within reach of it, on either side, works it. */
type Line = { id: string; cells: Hex[] };

/** An event from one station, with where it came from. */
type Tagged = { hex: Hex; arm: string; event: Event };

/** A case on a line, `at` metres from the line's origin. */
type Riding = Omit<Rider, 'distance'> & { at: number };

/**
 * The hub: the grid of stations, the belt lines on the floor, and the board
 * of pallets with their plans. It assigns nothing. It puts pallets on the
 * board and sets each arm's capacity; the arms pick up what they can reach.
 * It carries what the arms set on a line to the arm at its end.
 */
const create = ({
  cells,
  lines,
  connect,
  feed = () => {},
}: {
  cells: Cell[];
  lines: Line[];
  connect: (arm: string) => Link;
  /** Hands an arm's sensors the boxes round it, in its own frame: the simulation's side door. */
  feed?: (arm: string, boxes: Box[]) => void;
}) => {
  const stations = new Map<string, Station>();
  const targets = new Map<string, Target>();
  const riders = new Map<string, Riding[]>();
  /** Whether each line's belt is running, as of the last tick. */
  const running = new Map<string, boolean>();
  /** The arms with their alarm on: while any is, every belt stands and every arm holds. */
  const alarms = new Set<string>();
  /** The obstacles on the floor, in its frame. Every station gets them in its own. */
  let blocks: Box[] = [];
  let events: Tagged[] = [];

  lines.forEach(({ cells: along, id }) => {
    if (along.length < 2) {
      throw new Error(`line ${id}: needs two cells to run between`);
    }
  });

  const floor = lines.map(({ cells: along, id }) => geometry(id, along));

  /** The arms that work a line, nearest its origin first. */
  const worked = (found: Geometry) =>
    cells
      .filter(({ hex }) => reaches(found, hex))
      .map((cell) => ({ ...cell, ...beside(found, cell.hex) }))
      .sort((a, b) => a.along - b.along);

  floor.forEach((found) => {
    const arms = worked(found);

    if (!arms.length) {
      throw new Error(`line ${found.id}: no arm within reach of it`);
    }

    // The belt runs on to the furthest arm that works it, whichever side of the line it stands on.
    found.end = extended(
      found,
      cells.map(({ hex }) => hex)
    ).end;
    riders.set(found.id, []);
  });

  // Belts never cross: a case on one would meet a case on the other.
  floor.forEach((a, first) =>
    floor.slice(first + 1).forEach((b) => {
      if (!apart(a, b)) {
        throw new Error(`lines ${a.id} and ${b.id} cross`);
      }
    })
  );

  /** The arms at the end of a line, from its last cell on, on either side of it: they all take cases off it. */
  const last = (found: Geometry) =>
    worked(found).filter(({ along }) => along >= found.span - 1e-6);

  cells.forEach(({ hex, arm }) =>
    stations.set(
      index(hex),
      station({
        id: arm,
        hex,
        layout: layout({
          shared: SIDES.filter((side) =>
            cells.some(
              (other) => index(other.hex) === index(neighbour(hex, side))
            )
          ),
          belts: floor
            .filter((found) => reaches(found, hex))
            .map((found) => {
              const arms = worked(found);
              const here = arms.find((one) => index(one.hex) === index(hex))!;

              return stretch(found, hex, {
                end: last(found).some((one) => index(one.hex) === index(hex)),
                downstream: arms
                  .filter((one) => one.along > here.along + 1e-6)
                  .map((one) => one.hex),
              });
            }),
        }),
        link: connect(arm),
      })
    )
  );

  /** The pick zones at the end of a line, nearest first: each end arm's station and how far along the line it picks. */
  const ending = (found: Geometry) =>
    last(found).map(({ along, hex }) => ({
      station: stations.get(index(hex))!,
      at: along,
    }));

  /** What the arms read and write. */
  const board: Board = {
    targets: () => [...targets.values()],
    claim: (id, arm) => {
      const target = targets.get(id);

      if (!target || target.claimed) {
        return null;
      }

      target.claimed = arm;

      return target;
    },
    release: (id, cases, queue) => {
      const target = targets.get(id);

      if (target) {
        target.claimed = null;
        target.cases = cases;
        target.queue = queue;
      }
    },
  };

  /** Whether a station has its buffer or a pallet of its own on a slot. */
  const standing = (place: Target['at'], except: string) => {
    const found = stations.get(index(place.parent));

    if (!found) {
      return false;
    }

    return (
      found.layout.pallets.some(
        (pallet) => pallet.id !== except && pallet.side === place.slot
      ) || on(found.layout.buffer, place.slot)
    );
  };

  /**
   * Whether a slot, or the slot facing it across the edge to a neighbouring
   * cell, already holds something: a pallet, a buffer, or a pallet of an
   * arm's own. Two pallets there would stand on one another.
   */
  const taken = (at: Target['at'], except: string) => {
    const places = [
      at,
      { parent: neighbour(at.parent, at.slot), slot: opposite(at.slot) },
    ];

    return places.some(
      (place) =>
        [...targets.values()].some(
          (target) =>
            target.id !== except &&
            index(target.at.parent) === index(place.parent) &&
            target.at.slot === place.slot
        ) || standing(place, except)
    );
  };

  /** Puts a pallet on the floor, with its cases and the order they go in, unless something stands there already. */
  const place = (target: Omit<Target, 'claimed' | 'version'>) => {
    if (taken(target.at, target.id)) {
      events.push({
        hex: target.at.parent,
        arm: 'hub',
        event: {
          type: 'note',
          level: 'error',
          text: `No room for pallet ${target.id}`,
          detail: `slot ${target.at.slot} of ${index(target.at.parent)} is taken, or the one facing it`,
        },
      });

      return;
    }

    targets.set(target.id, { ...target, version: 0, claimed: null });
  };

  /** Changes a pallet's plan: the order its cases go in, or where they go. */
  const plan = (id: string, change: { queue?: string[]; to?: Hex }) => {
    const target = targets.get(id);

    if (target) {
      target.queue = change.queue ?? target.queue;
      target.to = change.to ?? target.to;
      target.version += 1;
    }
  };

  const remove = (id: string) => {
    const target = targets.get(id);

    if (target && !target.claimed) {
      targets.delete(id);
    }
  };

  /** Puts cases on a line, as after the floor is built again with cases still riding. */
  const ride = (line: string, riding: Riding[]) => {
    if (riders.has(line)) {
      riders.set(line, [...riding]);
    }
  };

  /** Sets how many pallets `arm` may pick up per period. */
  const configure = (arm: string, capacity: Capacity) =>
    [...stations.values()].find((one) => one.id === arm)?.configure(capacity);

  /** The obstacles as the arm in `hex` sees them: from its base, which only shifts them. */
  const shifted = (hex: Hex) => {
    const { x, z } = centre(hex);

    return blocks.map(({ id, min, max }) => ({
      id,
      min: { x: min.x - x, y: min.y, z: min.z - z },
      max: { x: max.x - x, y: max.y, z: max.z - z },
    }));
  };

  /** The obstacles standing on a line's belt. */
  const blocking = (found: Geometry) =>
    blocks.filter((box) => covers(found, box));

  const load = (hex: Hex) => {
    const found = stations.get(index(hex));

    if (!found) {
      return;
    }

    alarms.delete(found.id);
    feed(found.id, shifted(hex));
    found.load(shifted(hex));
  };

  /**
   * The obstacles on the floor as they stand now; `moved` when the operator
   * moved one. Every station hears of them, and a line with one on its belt
   * is noted as stopped, or as running again once it's clear.
   */
  const block = (boxes: Box[], moved: boolean) => {
    const before = new Map(
      floor.map((found) => [found.id, blocking(found).map(({ id }) => id)])
    );

    blocks = boxes;
    stations.forEach((one, key) => {
      // The sensors meet every box; the station is told of them and works out which it knows.
      feed(one.id, shifted(parse(key)));
      one.obstacles(shifted(parse(key)), moved);
    });

    floor.forEach((found, order) => {
      const was = before.get(found.id) ?? [];
      const now = blocking(found).map(({ id }) => id);
      const hex = lines[order].cells[0];

      if (now.length && !was.length) {
        events.push({
          hex,
          arm: 'hub',
          event: {
            type: 'note',
            level: 'warning',
            text: `Line ${found.id} stopped`,
            detail: `${now.join(', ')} on the belt`,
          },
        });
      } else if (!now.length && was.length) {
        events.push({
          hex,
          arm: 'hub',
          event: {
            type: 'note',
            level: 'info',
            text: `Line ${found.id} running again`,
            detail: 'the belt is clear',
          },
        });
      }
    });
  };

  /**
   * Carries a line's riders along for `dt` seconds, as one belt: they all
   * move together, and the belt stops whenever the case at its front can't
   * go on. A rider at a pick zone is taken by the arm there if it's ready;
   * otherwise the front rider runs up to the next zone whose arm is ready,
   * through a busy one that is clear, or stops short of one with something
   * in it, and of the last one.
   */
  const carry = (found: Geometry, dt: number) => {
    const riding = riders.get(found.id)!.sort((a, b) => b.at - a.at);
    const zones = ending(found);

    // Nothing moves while an arm's alarm is on, or while an obstacle stands on this belt.
    if (alarms.size || blocking(found).length) {
      running.set(found.id, false);

      return;
    }

    // Whatever sits on a zone whose arm is ready comes off first.
    for (let order = riding.length - 1; order >= 0; order--) {
      const rider = riding[order];
      const zone = zones.find(({ at }) => Math.abs(at - rider.at) < 1e-6);

      if (zone && zone.station.receive({ ...rider, distance: 0 })) {
        riding.splice(order, 1);
      }
    }

    /** How far a rider may go before a pick zone stops it. */
    const bound = (rider: Riding) => {
      const coming = zones.filter(({ at }) => at >= rider.at - 1e-6);
      let limit = rider.at;

      for (const [step, each] of coming.entries()) {
        const clear = each.station.clear(found.id);

        if (
          each.station.ready(found.id) ||
          (clear && step === coming.length - 1)
        ) {
          limit = each.at;

          break;
        }

        if (!clear) {
          limit = each.at - ROOM;

          break;
        }
      }

      return limit;
    };

    // One belt: it stands still while a case waits in any pick zone, or while a rider is held by
    // one; otherwise every case on it moves the same way, keeping its room behind the one ahead.
    const free =
      zones.every(({ station: one }) => one.clear(found.id)) &&
      riding.every((rider) => bound(rider) > rider.at + 1e-9);

    running.set(found.id, riding.length > 0 && free);

    if (!free) {
      return;
    }

    const step = found.speed * Math.min(dt, 0.1);

    riding.forEach((rider, order) => {
      const ahead = riding[order - 1];

      rider.at = Math.min(
        bound(rider),
        ahead ? ahead.at - ROOM : Infinity,
        rider.at + step
      );
    });
  };

  /** What rides a line as the arm in `hex` sees it: distances from that arm. */
  const view = (hex: Hex) =>
    floor
      .filter((found) => reaches(found, hex))
      .flatMap((found) => {
        const { along } = beside(found, hex);

        return riders
          .get(found.id)!
          .map(({ at, ...rider }) => ({ ...rider, distance: at - along }));
      });

  /** The lines past `hex` whose belts run. */
  const moving = (hex: Hex) =>
    floor
      .filter((found) => reaches(found, hex) && running.get(found.id))
      .map(({ id }) => id);

  /**
   * Runs the lines, then every station with what rides past it, and takes
   * what the arms set down. An alarm on any arm holds the whole floor till
   * it's off again.
   */
  const tick = (dt: number) => {
    floor.forEach((found) => carry(found, dt));

    stations.forEach((one, key) => {
      const hex = parse(key);

      one.tick(dt, board, view(hex), moving(hex));

      for (const event of one.drain()) {
        if (event.type === 'alarm') {
          alarms.add(one.id);
        }

        if (event.type === 'calm') {
          alarms.delete(one.id);
        }

        if (event.type === 'placed') {
          const found = floor.find((each) => each.id === event.rider.belt);

          if (found) {
            const { distance, ...rider } = event.rider;

            // On the belt, never past either end of it.
            riders.get(found.id)!.push({
              ...rider,
              at: Math.min(
                found.end,
                Math.max(
                  found.start,
                  beside(found, parse(key)).along + distance
                )
              ),
            });
          }

          // Off its pallet for good: no plan lists it any more.
          targets.forEach((target) => {
            target.queue = target.queue.filter((id) => id !== event.rider.id);
            target.cases = target.cases.filter(
              ({ id }) => id !== event.rider.id
            );
          });
        }

        events.push({ hex: parse(key), arm: one.id, event });
      }
    });

    stations.forEach((one) => one.pause(alarms.size > 0));
  };

  const drain = () => {
    const out = events;

    events = [];

    return out;
  };

  const close = () => stations.forEach((one) => one.close());

  return {
    stations,
    board,
    floor,
    riders,
    running,
    taken,
    block,
    close,
    configure,
    drain,
    load,
    place,
    plan,
    remove,
    ride,
    tick,
  };
};

type Hub = ReturnType<typeof create>;

export { create };
export type { Case, Cell, Hub, Line, Riding, Tagged };

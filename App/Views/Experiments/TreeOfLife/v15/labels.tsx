import React, { useEffect, useRef, useSyncExternalStore } from 'react';

// Components
import { Badge } from '@/Components';

import THREE, { Fiber } from '@/Three';

/**
 * Labels live in screen space, not in the scene.
 *
 * Two reasons. They must not scale with the camera — a name is text, and text
 * that shrinks as you pull back stops being readable long before the thing it
 * names does. And they have to be placed against each other, which is a
 * two-dimensional problem: only once everything is projected is it knowable
 * whether two names overlap.
 *
 * So a projector inside the Canvas publishes screen coordinates each frame,
 * and a DOM layer outside it seats the pills against an occupancy grid. Each
 * pill is a `Badge` — being DOM they are pixel-sized by definition and inherit
 * the app's chip styling rather than reimplementing it in a texture.
 *
 * The split is between *what* and *where*. React owns the set of labels, which
 * changes only when the tree does; the frame loop owns their placement, which
 * changes every frame and never re-renders anything — it writes `transform`
 * and a seated flag straight onto the elements React mounted.
 */

export type LabelInput = {
  text: string;
  position: readonly [number, number, number];
  /** Higher wins a contested seat. */
  priority: number;
  /** Body radius in world units, so its projected size can be an obstacle. */
  radius: number;
  /**
   * Border colour, set only by the taxon the route is on.
   *
   * The focused taxon already announces itself in the scene with an aura in
   * its own colour; carrying that colour onto its label ties the name to the
   * body rather than leaving the reader to work out which of a dozen chips
   * belongs to the thing being looked at. Every other label keeps the neutral
   * chip border, so the accent means exactly one thing.
   */
  accent?: string;
};

/**
 * Every taxon publishes its own label here.
 *
 * The alternative — the canvas assembling the list — only ever worked for the
 * lineage, because that is the only part whose positions the canvas knows.
 * Descendants derive their own tips inside `Taxon` and never report them, so
 * they could not be labelled at all. Letting the thing that knows where it is
 * say what it is called fixes that, and keeps the two from drifting apart.
 */
const registry = new Map<string, LabelInput>();

/*
 * Membership is React's business, so changes to it have to be announced.
 * Registration happens in a taxon's effect, and every taxon's effect runs in
 * the same commit, so the notifications batch into one re-render of the layer.
 */
const listeners = new Set<() => void>();
let version = 0;

function publish(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getVersion(): number {
  return version;
}

export function registerLabel(key: string, input: LabelInput): () => void {
  registry.set(key, input);
  publish();

  return () => {
    if (registry.get(key) === input) {
      registry.delete(key);
      publish();
    }
  };
}

type Projected = {
  key: string;
  text: string;
  accent?: string;
  x: number;
  y: number;
  priority: number;
  radiusPx: number;
  visible: boolean;
};

type Store = {
  projected: Projected[];
  width: number;
  height: number;
};

const store: Store = { projected: [], width: 0, height: 0 };

/** Publishes screen positions each frame. Must live inside the Canvas. */
export const LabelProjector: React.FunctionComponent = () => {
  const camera = Fiber.useThree((state) => state.camera);
  const size = Fiber.useThree((state) => state.size);
  const scratch = useRef(new THREE.Vector3());

  Fiber.useFrame(() => {
    store.width = size.width;
    store.height = size.height;

    store.projected = [...registry.entries()].map(([key, label]) => {
      scratch.current.set(...(label.position as [number, number, number]));

      const distance = camera.position.distanceTo(scratch.current);

      scratch.current.project(camera);

      const perspective = camera as THREE.PerspectiveCamera;
      const worldPerPx =
        (2 * distance * Math.tan(((perspective.fov ?? 50) * Math.PI) / 360)) /
        size.height;

      return {
        key,
        text: label.text,
        accent: label.accent,
        x: ((scratch.current.x + 1) / 2) * size.width,
        y: ((1 - scratch.current.y) / 2) * size.height,
        priority: label.priority,
        radiusPx: label.radius / Math.max(worldPerPx, 1e-6),
        // `z > 1` is behind the camera, where the projection flips.
        visible: scratch.current.z <= 1,
      };
    });
  });

  return null;
};

/*
 * Occupancy grid.
 *
 * Testing every candidate seat against every obstacle would be far too much
 * per frame; binning into coarse cells makes marking and querying near
 * constant time, at the cost of placing to within a cell rather than a pixel.
 */
const CELL_PX = 12;

type Grid = { cols: number; rows: number; bits: Uint8Array };

function createGrid(width: number, height: number): Grid {
  const cols = Math.max(1, Math.ceil(width / CELL_PX));
  const rows = Math.max(1, Math.ceil(height / CELL_PX));

  return { cols, rows, bits: new Uint8Array(cols * rows) };
}

function forEachCell(
  grid: Grid,
  left: number,
  top: number,
  right: number,
  bottom: number,
  visit: (index: number) => void
): void {
  const c0 = Math.max(0, Math.floor(left / CELL_PX));
  const c1 = Math.min(grid.cols - 1, Math.floor(right / CELL_PX));
  const r0 = Math.max(0, Math.floor(top / CELL_PX));
  const r1 = Math.min(grid.rows - 1, Math.floor(bottom / CELL_PX));

  for (let r = r0; r <= r1; r += 1) {
    for (let c = c0; c <= c1; c += 1) {
      visit(r * grid.cols + c);
    }
  }
}

function mark(grid: Grid, l: number, t: number, r: number, b: number): void {
  forEachCell(grid, l, t, r, b, (index) => {
    grid.bits[index] = 1;
  });
}

/** Occupied cells a rect overlaps — zero means a clear seat. */
function cost(grid: Grid, l: number, t: number, r: number, b: number): number {
  let total = 0;

  forEachCell(grid, l, t, r, b, (index) => {
    total += grid.bits[index] ?? 0;
  });

  return total;
}

/** Candidate seats: two rings of eight bearings, nearest ring tried first. */
const SEAT_ANGLES = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);
const SEAT_RINGS = [1, 1.8];

const GAP_PX = 10;
const EDGE_PAD = 12;
/** At or above this, a label is placed even with no perfectly clear seat. */
const FORCE_PLACE_PRIORITY = 3;

const CLASS_ROOT = 'kicl--views--experiments--tree-of-life--v15';

/**
 * A pill's own styling on top of `Badge`'s `outline` variant, which already
 * carries the chip's background, border, radius, padding and backdrop blur.
 * The local class adds only what a *floating* chip needs.
 */
const PILL_CLASS = [
  `${CLASS_ROOT}__label`,
  'kicl-position-absolute',
  'kicl-pointer-events-none',
  'kicl-font-size-smaller',
].join(' ');

/**
 * Fixed chrome labels must also stay clear of.
 *
 * Scoped to this view: `kicl-position-fixed` is a utility anything may use, and
 * `querySelector` takes the first match — an unscoped selector would drift onto
 * whatever else on the page happens to be fixed, such as the global header.
 */
const CHROME = [`.${CLASS_ROOT} .kicl-position-fixed`];

/** DOM layer. Sits outside the Canvas and seats the pills each frame. */
export const Labels: React.FunctionComponent = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Re-render when labels are added or removed — never when they move.
  useSyncExternalStore(subscribe, getVersion, getVersion);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const host = hostRef.current;

      if (host && store.width) {
        const pills = pillsRef.current;
        const grid = createGrid(store.width, store.height);

        // Bodies are obstacles in their own right — a name over the thing it
        // names is worse than one slightly further away.
        store.projected.forEach((item) => {
          if (item.visible) {
            mark(
              grid,
              item.x - item.radiusPx,
              item.y - item.radiusPx,
              item.x + item.radiusPx,
              item.y + item.radiusPx
            );
          }
        });

        const bounds = host.getBoundingClientRect();

        CHROME.forEach((selector) => {
          const element = document.querySelector(selector);

          if (element) {
            const rect = element.getBoundingClientRect();

            mark(
              grid,
              rect.left - bounds.left,
              rect.top - bounds.top,
              rect.right - bounds.left,
              rect.bottom - bounds.top
            );
          }
        });

        // Most important first: a contested seat should go to the label that
        // matters most, and the ones after it work around what is taken.
        [...store.projected]
          .sort((a, b) => b.priority - a.priority)
          .forEach((item) => {
            const pill = pills.get(item.key);

            // Projected this frame but not mounted yet — it will be next frame.
            if (!pill) {
              return;
            }

            if (!item.visible) {
              pill.dataset.seated = 'false';

              return;
            }

            const width = pill.offsetWidth;
            const height = pill.offsetHeight;

            let best: { x: number; y: number; cost: number } | null = null;

            SEAT_RINGS.forEach((ring) => {
              SEAT_ANGLES.forEach((angle) => {
                const reach = item.radiusPx * ring + GAP_PX;
                const x = item.x + Math.cos(angle) * reach - width / 2;
                const y = item.y + Math.sin(angle) * reach - height / 2;

                // Off the edge is never a seat, however clear it looks.
                if (
                  x < EDGE_PAD ||
                  y < EDGE_PAD ||
                  x + width > store.width - EDGE_PAD ||
                  y + height > store.height - EDGE_PAD
                ) {
                  return;
                }

                const seat = cost(grid, x, y, x + width, y + height);

                if (!best || seat < best.cost) {
                  best = { x, y, cost: seat };
                }
              });
            });

            const seat = best as { x: number; y: number; cost: number } | null;

            if (
              !seat ||
              (seat.cost > 0 && item.priority < FORCE_PLACE_PRIORITY)
            ) {
              // Nowhere clear, and not important enough to sit on something.
              pill.dataset.seated = 'false';

              return;
            }

            /*
             * Seated state is an attribute, not an inline opacity, so the
             * stylesheet can make arriving and leaving behave differently — a
             * transition is read from the state being entered, and only the
             * seated rule carries one.
             */
            pill.dataset.seated = 'true';
            pill.style.transform = `translate3d(${Math.round(seat.x)}px, ${Math.round(seat.y)}px, 0)`;

            mark(grid, seat.x, seat.y, seat.x + width, seat.y + height);
          });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={hostRef}
      className={`${CLASS_ROOT}__labels kicl-position-absolute kicl-pointer-events-none`}
    >
      {[...registry.entries()].map(([key, label]) => (
        <Badge
          key={key}
          is='span'
          variant='outline'
          className={PILL_CLASS}
          style={
            label.accent
              ? ({
                  '--kicl--components--badge--border-color': label.accent,
                } as React.CSSProperties)
              : undefined
          }
          ref={(node: HTMLElement | null) => {
            if (node) {
              pillsRef.current.set(key, node);
            } else {
              pillsRef.current.delete(key);
            }
          }}
        >
          {label.text}
        </Badge>
      ))}
    </div>
  );
};

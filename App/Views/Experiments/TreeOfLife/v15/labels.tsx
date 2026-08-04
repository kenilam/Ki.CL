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

/**
 * Where each label currently sits, remembered between frames.
 *
 * Held as a bearing and an offset from its node rather than as a screen
 * position: an absolute seat means nothing once the camera moves, whereas an
 * offset stays meaningful and can be carried, compared and eased.
 */
type Seat = {
  ring: number;
  angle: number;
  /** Current offset from the node, eased toward the chosen bearing. */
  dx: number;
  dy: number;
  started: boolean;
  /** Whether it is currently displayed, so hiding can want more than showing. */
  shown: boolean;
};

const seats = new Map<string, Seat>();

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

/**
 * Add or update a label.
 *
 * Membership and content are separate on purpose. A taxon's label changes
 * whenever the route does — its priority and accent both depend on what is
 * focused — and if that were expressed as unregister-then-register, the entry
 * would leave the map for an instant and React would tear the pill down and
 * build a new one. A taxon present in both the old and new lineage would blink
 * on every navigation despite never actually going anywhere.
 *
 * So only a change React has to see re-renders the layer. Position and
 * priority are read by the frame loop straight off the registry, so moving a
 * label costs nothing.
 */
export function setLabel(key: string, input: LabelInput): void {
  const previous = registry.get(key);

  // Back before the sweep ran — a re-parent, not a departure.
  pending.delete(key);

  registry.set(key, input);

  if (
    !previous ||
    previous.text !== input.text ||
    previous.accent !== input.accent
  ) {
    publish();
  }
}

/**
 * Keys whose taxon has unmounted but which may be about to come straight back.
 *
 * A taxon that appears in both the old and the new lineage still unmounts when
 * the recursion re-parents it — it was drawn under one ancestor and is now
 * drawn under another — and React tears the component down and builds a new one
 * for the new position. Removing on that cleanup destroyed the pill and rebuilt
 * it, which is a blink for a label that never actually went anywhere: measured,
 * 11 of 18 labels present in both lineages were being rebuilt.
 *
 * So removal is deferred by a frame. Anything re-registered in the meantime is
 * a re-parent and keeps its element; anything still pending has genuinely gone.
 */
const pending = new Set<string>();
let sweeping = 0;

/**
 * How long a departed label is held before it is really dropped.
 *
 * Long enough to outlast the mount cascade: the replacement tree arrives a
 * slice per frame, so a taxon's counterpart can be a second or more behind the
 * unmount. A single frame of grace — which is what this was first written as —
 * expired long before the taxon came back, and the label was rebuilt anyway.
 */
const REMOVAL_GRACE = 2500;

/**
 * Every taxon currently drawn, by node id.
 *
 * The registry already knows exactly this — it is populated by each taxon as
 * it mounts and emptied as it leaves — so anything wanting "what is on screen"
 * can read it here rather than assembling a second list that would drift.
 * Pending removals are excluded: their taxon has gone even if the pill is
 * being held a moment in case it returns.
 */
export function drawnTaxa(): string[] {
  return [...registry.keys()].filter((key) => !pending.has(key));
}

/*
 * The same store the layer subscribes to, exposed so anything listing the drawn
 * taxa re-reads when that set changes. `drawnTaxa` builds a fresh array on every
 * call, so it cannot be the snapshot itself — the version is, and callers derive
 * the list from it.
 */
export { subscribe as subscribeDrawn, getVersion as drawnVersion };

export function isPendingRemoval(key: string): boolean {
  return pending.has(key);
}

function sweep(): void {
  sweeping = 0;

  if (pending.size === 0) {
    return;
  }

  pending.forEach((key) => {
    registry.delete(key);
    // A remembered bearing outlives its label otherwise, and the tree churns
    // through thousands of them across a session.
    seats.delete(key);
  });

  pending.clear();
  publish();
}

/**
 * Drop a label, unless its taxon comes back.
 *
 * The element is kept alive in the meantime but hidden, so a taxon that is
 * merely being re-parented reuses its pill instead of having a new one built —
 * which is what made a label blink on a route change despite never leaving the
 * tree. Nothing stale is drawn, because a pending label is not seated.
 */
export function removeLabel(key: string): void {
  if (!registry.has(key)) {
    return;
  }

  pending.add(key);

  window.clearTimeout(sweeping);
  sweeping = window.setTimeout(sweep, REMOVAL_GRACE);
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

/**
 * How much better a challenger has to be before a label gives up its bearing.
 *
 * Seats used to be re-elected from scratch every frame and handed to whoever
 * won by a single occupied cell — and a cell is 12px, so a sub-pixel drift
 * during a zoom was enough to flip a label from above its node to below it.
 * Requiring a real margin means a bearing is kept until it is properly blocked,
 * which is what stops the jumping.
 */
const INCUMBENT_MARGIN = 3;

/**
 * How covered a label has to become before it gives up and hides.
 *
 * Appearing needs a properly clear seat; disappearing needs real obstruction.
 * The two thresholds differ on purpose — with a single one, a label sitting
 * near the boundary flips every time the grid shifts under it, and the tree
 * mounts in slices, so the grid shifts constantly for the first second after a
 * route change. Measured before this: 14 of 18 labels blinking, the worst
 * toggling 18 times inside a second.
 */
const HIDE_ABOVE = 6;

/**
 * How quickly a label slides to a new bearing, per second.
 *
 * Only the *offset* from the node is damped. The node's own projected position
 * is used live, so panning and zooming track exactly with no lag — what eases
 * is the rare change of side, which would otherwise be a teleport.
 */
const SETTLE_EASE = 12;

const GAP_PX = 10;
const EDGE_PAD = 12;
/** At or above this, a label is placed even with no perfectly clear seat. */
const FORCE_PLACE_PRIORITY = 3;

/**
 * The taxon under the pointer, if any.
 *
 * Read by the frame loop rather than announced to React: hovering changes
 * where one pill sits, not which pills exist, and the loop is already running.
 *
 * A hovered label is placed unconditionally. Every other label can lose its
 * seat to a more important one and vanish, which is right when the layer is
 * choosing for you — but pointing at something is the one moment you have
 * asked for a specific name, and answering "no room" is never the useful reply.
 */
let hovered: string | null = null;

export function setHovered(nodeId: string | null): void {
  hovered = nodeId;
}

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

        /*
         * Every fixed region, not the first one found. There is more than one
         * now — the search and detail panels on one side, the animation
         * control on the other — and `querySelector` would have reserved space
         * around whichever happened to come first in the document, leaving
         * labels free to sit under the rest.
         */
        CHROME.forEach((selector) => {
          document.querySelectorAll(selector).forEach((element) => {
            const rect = element.getBoundingClientRect();

            mark(
              grid,
              rect.left - bounds.left,
              rect.top - bounds.top,
              rect.right - bounds.left,
              rect.bottom - bounds.top
            );
          });
        });

        // Most important first: a contested seat should go to the label that
        // matters most, and the ones after it work around what is taken. The
        // hovered one is asked for directly, so it outranks the lot and is
        // seated before anything else can take the space around it.
        [...store.projected]
          .sort(
            (a, b) =>
              Number(b.key === hovered) - Number(a.key === hovered) ||
              b.priority - a.priority
          )
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

            const held = seats.get(item.key);

            /*
             * Score every bearing, but let the one already in use keep it
             * unless a challenger is meaningfully better. Without that a label
             * changes side the instant another wins by a single grid cell,
             * which under a moving camera happens constantly.
             */
            let best: { ring: number; angle: number; cost: number } | null =
              null;
            let incumbent: number | null = null;

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

                const score = cost(grid, x, y, x + width, y + height);

                if (held && held.ring === ring && held.angle === angle) {
                  incumbent = score;
                }

                if (!best || score < best.cost) {
                  best = { ring, angle, cost: score };
                }
              });
            });

            const winner = best as {
              ring: number;
              angle: number;
              cost: number;
            } | null;

            // Keep the current bearing unless it is properly beaten.
            const standing: number | null = incumbent;
            const keep =
              held !== undefined &&
              standing !== null &&
              (winner === null || standing <= winner.cost + INCUMBENT_MARGIN);

            const chosen =
              keep && held && standing !== null
                ? { ring: held.ring, angle: held.angle, cost: standing }
                : winner;

            /*
             * Asymmetric thresholds: a label has to find a clear seat to
             * appear, but has to be properly buried before it will go. A single
             * threshold makes anything sitting near it flicker, which is most
             * labels while the tree is still mounting.
             */
            const forced =
              item.key === hovered || item.priority >= FORCE_PLACE_PRIORITY;
            // Its taxon has gone; the element is only being kept in case it
            // comes back, so it must not be drawn in the meantime.
            const departing = isPendingRemoval(item.key);
            const wasShown = held?.shown ?? false;
            const show =
              !departing &&
              (forced ||
                (chosen !== null &&
                  (wasShown ? chosen.cost <= HIDE_ABOVE : chosen.cost === 0)));

            /*
             * The transform is written either way, so a hidden pill keeps
             * tracking its node — otherwise it freezes where it was and
             * teleports whenever it comes back.
             *
             * Seated state is an attribute rather than an inline opacity, so
             * the stylesheet can make arriving and leaving behave differently:
             * a transition is read from the state being entered, and only the
             * seated rule carries one.
             */
            pill.dataset.seated = show ? 'true' : 'false';

            /*
             * A hovered label with no usable bearing — every candidate off the
             * edge, say — still has to go somewhere, so it sits just clear of
             * the body it names.
             */
            const bearing = chosen ?? {
              ring: SEAT_RINGS[0] as number,
              angle: 0,
              cost: 0,
            };

            const reach = item.radiusPx * bearing.ring + GAP_PX;
            const targetX = Math.cos(bearing.angle) * reach - width / 2;
            const targetY = Math.sin(bearing.angle) * reach - height / 2;

            const seat: Seat = held ?? {
              ring: bearing.ring,
              angle: bearing.angle,
              dx: targetX,
              dy: targetY,
              started: false,
              shown: false,
            };

            seat.ring = bearing.ring;
            seat.angle = bearing.angle;
            seat.shown = show;

            /*
             * Ease the offset, never the position. The node's own projected
             * point is used live below, so panning and zooming track it exactly
             * — what is damped is only the change of side, which would
             * otherwise read as a jump.
             */
            if (seat.started) {
              const step = 1 - Math.exp(-SETTLE_EASE * (1 / 60));

              seat.dx += (targetX - seat.dx) * step;
              seat.dy += (targetY - seat.dy) * step;
            } else {
              seat.dx = targetX;
              seat.dy = targetY;
              seat.started = true;
            }

            seats.set(item.key, seat);

            const placed = { x: item.x + seat.dx, y: item.y + seat.dy };

            pill.style.transform = `translate3d(${Math.round(placed.x)}px, ${Math.round(placed.y)}px, 0)`;

            mark(grid, placed.x, placed.y, placed.x + width, placed.y + height);
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
          data-node={key}
          key={key}
          is='span'
          variant={label.accent ? 'secondary' : 'outline'}
          /*
           * The routed taxon's own chip is a step larger, on the same signal
           * that colours its border — so the label you are actually reading is
           * distinguished by weight as well as by hue, and still reads as one
           * when the accent is hard to pick out against the tree behind it.
           */
          size={label.accent ? 'large' : 'small'}
          className={PILL_CLASS}
          style={
            label.accent
              ? ({
                  '--kicl--components--badge--background-color': label.accent,
                  '--kicl--components--badge--color': `contrast-color(var(--kicl--components--badge--background-color))`,
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

// Constants
import { CLASS_NAME } from '@/views/experiments/tree-of-life/versions/v15/constants';

// Grid
import {
  EDGE_PAD,
  FORCE_PLACE_PRIORITY,
  GAP_PX,
  HIDE_ABOVE,
  INCUMBENT_MARGIN,
  SEAT_ANGLES,
  SEAT_RINGS,
  SETTLE_EASE,
  cost,
  createGrid,
  mark,
} from './grid';

// Store
import { type Seat, getHovered, isPendingRemoval, seats, store } from './store';

/**
 * Fixed chrome labels must also stay clear of.
 *
 * Scoped to this view: `kicl-position-fixed` is a utility anything may use, and
 * `querySelector` takes the first match - an unscoped selector would drift onto
 * whatever else on the page happens to be fixed, such as the global header.
 */
const CHROME = [`.${CLASS_NAME} .kicl-position-fixed`];

/** Seats every mounted pill for one frame, against the bodies, the chrome and each other. */
function place(host: HTMLElement, pills: Map<string, HTMLElement>): void {
  const hovered = getHovered();
  const grid = createGrid(store.width, store.height);

  // Bodies are obstacles in their own right - a name over the thing it
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
   * now - the search and detail panels on one side, the animation
   * control on the other - and `querySelector` would have reserved space
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

      // Projected this frame but not mounted yet - it will be next frame.
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
      let best: { ring: number; angle: number; cost: number } | null = null;
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
       * tracking its node - otherwise it freezes where it was and
       * teleports whenever it comes back.
       *
       * Seated state is an attribute rather than an inline opacity, so
       * the stylesheet can make arriving and leaving behave differently:
       * a transition is read from the state being entered, and only the
       * seated rule carries one.
       */
      pill.dataset.seated = show ? 'true' : 'false';

      /*
       * A hovered label with no usable bearing - every candidate off the
       * edge, say - still has to go somewhere, so it sits just clear of
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
       * - what is damped is only the change of side, which would
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

export { place };

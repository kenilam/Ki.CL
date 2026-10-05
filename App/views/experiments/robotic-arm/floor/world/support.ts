import { PALLET } from './layout';
import type { Case, Holder, World } from './types';

/*
 * What a released case lands on. With no physics on the page, a case drops
 * straight down onto the highest pallet or case holding a fair share of its
 * footprint, and rests there square, at the yaw it was let go. A neighbour it
 * only clips at the edge pushes it aside instead (./apart).
 */

type Rect = {
  x: number;
  z: number;
  width: number;
  depth: number;
  heading: number;
};

/** A point in a rectangle's own frame. */
const local = (rect: Rect, x: number, z: number) => {
  const dx = x - rect.x;
  const dz = z - rect.z;
  const cos = Math.cos(rect.heading);
  const sin = Math.sin(rect.heading);

  return { u: dx * cos - dz * sin, w: dx * sin + dz * cos };
};

const inside = (rect: Rect, x: number, z: number) => {
  const { u, w } = local(rect, x, z);

  return Math.abs(u) <= rect.width / 2 && Math.abs(w) <= rect.depth / 2;
};

const rectOf = ({ heading, position, size }: Case): Rect => ({
  x: position.x,
  z: position.z,
  width: size[0],
  depth: size[2],
  heading,
});

/** Points spread over a case's footprint, a 5 by 5 grid. */
const samples = (rect: Rect) => {
  const cos = Math.cos(rect.heading);
  const sin = Math.sin(rect.heading);
  const steps = [-0.4, -0.2, 0, 0.2, 0.4];

  return steps.flatMap((a) =>
    steps.map((b) => {
      const u = a * rect.width;
      const w = b * rect.depth;

      return { x: rect.x + u * cos + w * sin, z: rect.z - u * sin + w * cos };
    })
  );
};

/** A case rests on a neighbour that holds at least this share of its footprint; less, and it slides off. */
const BEARING = 1 / 3;

const supportUnder = (world: World, item: Case): Holder => {
  const { position } = item;
  const pallet = world.pallets.find((one) =>
    inside(
      {
        ...one.position,
        width: PALLET.width,
        depth: PALLET.depth,
        heading: one.heading,
      },
      position.x,
      position.z
    )
  );

  if (!pallet) {
    return { kind: 'floor' };
  }

  const footprint = samples(rectOf(item));
  const top = world.cases.reduce((highest, other) => {
    if (
      other === item ||
      other.holder.kind !== 'pallet' ||
      other.holder.pallet !== pallet.id ||
      footprint.filter(({ x, z }) => inside(rectOf(other), x, z)).length <
        footprint.length * BEARING
    ) {
      return highest;
    }

    return Math.max(highest, other.position.y + other.size[1] / 2);
  }, pallet.position.y + PALLET.height);
  const { u, w } = local(
    { ...pallet.position, width: 0, depth: 0, heading: pallet.heading },
    position.x,
    position.z
  );

  return apart(world, item, {
    kind: 'pallet',
    pallet: pallet.id,
    u,
    w,
    y: top - pallet.position.y + item.size[1] / 2,
    yaw: item.heading - pallet.heading,
  });
};

type OnPallet = Extract<Holder, { kind: 'pallet' }>;

/** Half a case's reach across the pallet's u and w, turned by its yaw on the pallet. */
const extents = (size: Case['size'], yaw: number) => {
  const cos = Math.abs(Math.cos(yaw));
  const sin = Math.abs(Math.sin(yaw));

  return {
    u: (cos * size[0] + sin * size[2]) / 2,
    w: (sin * size[0] + cos * size[2]) / 2,
  };
};

/** Space left when a case is pushed off a neighbour, in metres. */
const CLEAR = 0.005;

/**
 * A case set down partly inside a neighbour at the same height slides out of
 * it the short way, as contact would push it, and stays on the pallet. It
 * keeps trying while a slide pushes it into the next neighbour.
 */
const apart = (world: World, item: Case, holder: OnPallet): OnPallet => {
  const size = extents(item.size, holder.yaw);
  const half = item.size[1] / 2;
  const placed = { ...holder };

  for (let round = 0; round < 4; round++) {
    const hit = world.cases.find((other) => {
      if (
        other === item ||
        other.holder.kind !== 'pallet' ||
        other.holder.pallet !== holder.pallet
      ) {
        return false;
      }

      const them = extents(other.size, other.holder.yaw);

      return (
        Math.abs(other.holder.y - placed.y) <
          half + other.size[1] / 2 - CLEAR &&
        Math.abs(other.holder.u - placed.u) < size.u + them.u - CLEAR &&
        Math.abs(other.holder.w - placed.w) < size.w + them.w - CLEAR
      );
    });

    if (!hit || hit.holder.kind !== 'pallet') {
      return placed;
    }

    const them = extents(hit.size, hit.holder.yaw);
    const du = placed.u - hit.holder.u;
    const dw = placed.w - hit.holder.w;
    const overU = size.u + them.u - Math.abs(du);
    const overW = size.w + them.w - Math.abs(dw);

    if (overU < overW) {
      placed.u += Math.sign(du || 1) * (overU + CLEAR);
    } else {
      placed.w += Math.sign(dw || 1) * (overW + CLEAR);
    }

    placed.u = Math.max(
      -PALLET.width / 2 + size.u,
      Math.min(PALLET.width / 2 - size.u, placed.u)
    );
    placed.w = Math.max(
      -PALLET.depth / 2 + size.w,
      Math.min(PALLET.depth / 2 - size.w, placed.w)
    );
  }

  return placed;
};

export { inside, supportUnder, type Rect };

/**
 * A rectangle on the floor plan: centre, half extents along its own x and z,
 * and its heading, turned the way `rotation.y` turns.
 */
type Rect = { x: number; z: number; half: [number, number]; yaw: number };

/** A rectangle's own x and z directions, on the floor plan. */
const axes = ({ yaw }: Rect): [number, number][] => [
  [Math.cos(yaw), -Math.sin(yaw)],
  [Math.sin(yaw), Math.cos(yaw)],
];

/** How far a rectangle reaches from its centre along a direction. */
const reach = (rect: Rect, [x, z]: [number, number]) =>
  axes(rect).reduce(
    (sum, [ax, az], index) =>
      sum + rect.half[index] * Math.abs(ax * x + az * z),
    0
  );

/**
 * Whether two rectangles overlap by more than `margin`, by the separating axis
 * test: they are apart when some edge direction of either one has a gap
 * between their shadows.
 */
const overlap = (a: Rect, b: Rect, margin = 0) =>
  [...axes(a), ...axes(b)].every((axis) => {
    const distance = Math.abs((b.x - a.x) * axis[0] + (b.z - a.z) * axis[1]);

    return distance < reach(a, axis) + reach(b, axis) - margin;
  });

export { overlap };
export type { Rect };

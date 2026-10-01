import React, { useMemo } from 'react';

// Three
import { Drei } from '@/three';

// Grid
import { centre, type Hex as Cell, RADIUS } from 'arm/grid/hex';
import { FINE, slot } from 'arm/grid/layout';
import { SIDES } from 'arm/grid/hex';

/** A flat-topped hexagon's corners, on the floor, `radius` from `at`. */
const corners = (radius: number, at = { x: 0, z: 0 }, lift = 0.003) =>
  Array.from({ length: 7 }, (_, index) => {
    const angle = (index * Math.PI) / 3;

    return [
      at.x + radius * Math.cos(angle),
      lift,
      at.z + radius * Math.sin(angle),
    ] as [number, number, number];
  });

type Props = { hex: Cell };

/** A cell's outline on the floor, and the six slots round its arm. */
const Hex: React.FunctionComponent<Props> = ({ hex }) => {
  const { outline, slots } = useMemo(() => {
    const at = centre(hex);

    return {
      outline: corners(RADIUS, at),
      slots: SIDES.map((side) => {
        const [x, , z] = slot(side);

        return corners(
          FINE / (Math.sqrt(3) / 2),
          { x: at.x + x, z: at.z + z },
          0.002
        );
      }),
    };
  }, [hex]);

  return (
    <group>
      <Drei.Line color='#9a958a' lineWidth={1.5} points={outline} />
      {slots.map((points, side) => (
        <Drei.Line color='#c9c4b8' key={side} lineWidth={1} points={points} />
      ))}
    </group>
  );
};

export { corners, Hex };

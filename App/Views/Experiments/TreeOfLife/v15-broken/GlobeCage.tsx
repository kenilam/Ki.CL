import React, { useMemo } from 'react';

import { Drei } from '@/Three';

type Props = {
  center: readonly [number, number, number];
  radius: number;
};

const LATITUDES = 9;
const LONGITUDES = 12;
const SEGMENTS = 64;
const COLOR = '#b9c4c0';
const OPACITY = 0.5;

type Ring = Array<[number, number, number]>;

/**
 * Decorative orientation cage. Built from explicit latitude / longitude line
 * loops rather than a wireframe sphere — `wireframe` on a SphereGeometry
 * triangulates, which reads as a mesh of triangles instead of a globe.
 */
const GlobeCage: React.FunctionComponent<Props> = ({ center, radius }) => {
  const rings = useMemo<Ring[]>(() => {
    const [cx, cy, cz] = center;
    const out: Ring[] = [];

    // Latitude circles — skip the poles (radius 0).
    for (let i = 1; i < LATITUDES; i += 1) {
      const polar = (i / LATITUDES) * Math.PI;
      const y = Math.cos(polar) * radius;
      const ringRadius = Math.sin(polar) * radius;
      const ring: Ring = [];
      for (let s = 0; s <= SEGMENTS; s += 1) {
        const theta = (s / SEGMENTS) * Math.PI * 2;
        ring.push([
          cx + Math.cos(theta) * ringRadius,
          cy + y,
          cz + Math.sin(theta) * ringRadius,
        ]);
      }
      out.push(ring);
    }

    // Longitude half-circles, pole to pole.
    for (let j = 0; j < LONGITUDES; j += 1) {
      const azimuth = (j / LONGITUDES) * Math.PI * 2;
      const ring: Ring = [];
      for (let s = 0; s <= SEGMENTS; s += 1) {
        const polar = (s / SEGMENTS) * Math.PI;
        const ringRadius = Math.sin(polar) * radius;
        ring.push([
          cx + Math.cos(azimuth) * ringRadius,
          cy + Math.cos(polar) * radius,
          cz + Math.sin(azimuth) * ringRadius,
        ]);
      }
      out.push(ring);
    }

    return out;
  }, [center, radius]);

  return (
    <group>
      {rings.map((points, index) => (
        <Drei.Line
          key={index}
          points={points}
          color={COLOR}
          opacity={OPACITY}
          transparent
          lineWidth={0.6}
        />
      ))}
    </group>
  );
};

export default GlobeCage;

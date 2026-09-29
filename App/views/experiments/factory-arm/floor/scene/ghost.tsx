import React from 'react';

// Three
import { Drei } from '@/three';

// Grid
import { childCentre } from '@/views/experiments/factory-arm/cell/grid/child';
import { centre, RADIUS } from '@/views/experiments/factory-arm/cell/grid/hex';
import { FINE } from '@/views/experiments/factory-arm/cell/grid/layout';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { landing, useDrag } from './drag';
import { corners } from './hex';
import { footprint } from './obstacles';

/** A slot's outline radius: its own small hexagon. */
const SLOT = FINE / (Math.sqrt(3) / 2);

/**
 * While something is dragged: a thin black outline round where it stands,
 * and where it would land, green when it may, red when it may not. An arm
 * or a pallet is outlined by its hexagon, an obstacle by its footprint.
 * With nothing held, a thinner outline shows where a click would add an
 * arm or a pallet.
 */
const Ghost: React.FunctionComponent = () => {
  const { dragging, pointing } = useDrag();
  const { obstacles, stations, targets } = useHub();

  if (!dragging) {
    return (
      pointing && (
        <Drei.Line
          color={pointing.allowed ? '#2fd065' : '#e5322d'}
          lineWidth={1.5}
          points={corners(
            pointing.kind === 'arm' ? RADIUS : SLOT,
            landing(pointing),
            0.01
          )}
        />
      )
    );
  }

  if (dragging.kind === 'obstacle') {
    const from = obstacles.find(({ id }) => id === dragging.id);

    return (
      <>
        {from && (
          <Drei.Line
            color='#111111'
            lineWidth={1}
            points={footprint(from, 0.012)}
          />
        )}
        <Drei.Line
          color={dragging.allowed ? '#2fd065' : '#e5322d'}
          lineWidth={3}
          points={footprint(dragging.box, 0.01)}
        />
      </>
    );
  }

  const radius = dragging.kind === 'arm' ? RADIUS : SLOT;
  const from =
    dragging.kind === 'arm'
      ? (() => {
          const hex = stations.find(({ arm }) => arm === dragging.id)?.hex;

          return hex && centre(hex);
        })()
      : (() => {
          const at = targets.find(({ id }) => id === dragging.id)?.at;

          return at && childCentre(at);
        })();

  return (
    <>
      {from && (
        <Drei.Line
          color='#111111'
          lineWidth={1}
          points={corners(radius, from, 0.012)}
        />
      )}
      <Drei.Line
        color={dragging.allowed ? '#2fd065' : '#e5322d'}
        lineWidth={3}
        points={corners(radius, landing(dragging), 0.01)}
      />
    </>
  );
};

export { Ghost };

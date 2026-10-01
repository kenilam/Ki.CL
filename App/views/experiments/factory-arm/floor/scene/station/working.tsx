import React from 'react';

// Grid
import { index } from 'arm/grid/hex';

// Model
import { bearing, forward } from 'arm/model/kinematics';
import { slot } from 'arm/grid/layout';

// Context
import {
  type Station as Spec,
  useHub,
} from '@/views/experiments/factory-arm/floor/hub';

// Partials
import {
  Case,
  type Pose,
} from '@/views/experiments/factory-arm/floor/scene/case';
import { Handle } from '@/views/experiments/factory-arm/floor/scene/handle';
import { Pallet } from '@/views/experiments/factory-arm/floor/scene/pallet';

type Props = { station: Spec };

/**
 * The pallets on this cell's slots and the cases on them, in the cell's
 * frame. A pallet an arm has picked up is drawn from what the station
 * reports, so its cases move as the arm moves them; one waiting for an arm
 * is drawn from the board, where its cases sit relative to its centre.
 */
const Working: React.FunctionComponent<Props> = ({ station }) => {
  const { cells, drawn, extras, parked, revision, targets, toggle } = useHub();
  const { arm, hex } = station;
  const here = targets.filter(({ at }) => index(at.parent) === index(hex));
  const cell = cells.current.get(arm);

  void revision;

  const glow = (id: string) => () =>
    parked.current.has(id)
      ? 'stuck'
      : targets.some(({ queue }) => queue.includes(id))
        ? 'queued'
        : 'none';

  return (
    <group>
      {here.map((target) => (
        <Handle
          id={target.id}
          key={target.id}
          kind='pallet'
          position={slot(target.at.slot)}
          radius={0.7}
          top={1.4}
        >
          <Pallet position={slot(target.at.slot)} />
        </Handle>
      ))}
      {extras[arm]?.map((position) => (
        <Pallet key={position.join()} position={position} />
      ))}

      {/* Waiting pallets: their cases stand where the board says. */}
      {here
        .filter(({ claimed }) => claimed === null)
        .flatMap((target) => {
          const [x, y, z] = slot(target.at.slot);

          return target.cases.map((own) => (
            <Case
              glow={glow(own.id)}
              key={own.id}
              onClick={() => toggle(own.id)}
              own={own}
              pose={() => ({
                at: { x: own.at.x + x, y: own.at.y + y, z: own.at.z + z },
                yaw: own.yaw,
              })}
            />
          ));
        })}

      {/* The station's own: on its pallets, its buffer, or its belt end. */}
      {cell?.cases.map((own) => (
        <Case
          glow={glow(own.id)}
          key={own.id}
          onClick={() => toggle(own.id)}
          own={own}
          pose={() => {
            const now = cells.current
              .get(arm)
              ?.cases.find((one) => one.id === own.id);

            return now ? { at: now.at, yaw: now.yaw } : null;
          }}
        />
      ))}

      {/* On the pad: under it, turned with it. */}
      {cell?.holding && (
        <Case
          glow={() => 'queued'}
          key={cell.holding.id}
          own={cell.holding}
          pose={(): Pose | null => {
            // Under the pad as the arm is drawn this frame, not as last reported.
            const joints = drawn.current.get(arm);
            const held = cells.current.get(arm)?.holding;

            if (!joints || !held) {
              return null;
            }

            const pad = forward(joints);

            return {
              at: { x: pad.x, y: pad.y - held.size[1] / 2, z: pad.z },
              yaw: bearing(joints),
            };
          }}
        />
      )}
    </group>
  );
};

export { Working };

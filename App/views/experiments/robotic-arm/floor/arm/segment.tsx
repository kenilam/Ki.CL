import React, { useMemo } from 'react';

// Libraries
import { Quaternion, Vector3, type Group } from 'three';

// Robot
import { JOINTS, PAD, TOOL } from 'arm/robot';

// Constants
import { COLOURS } from '../constants';

const THICKNESS = 0.18;
const KNUCKLE = 0.14;
const PAD_THICKNESS = 0.06;
const UP = new Vector3(0, 1, 0);

type Props = {
  index: number;
  /** Hands each joint's group to the arm, which rotates it. */
  attach: (index: number, group: Group | null) => void;
  /** The links' colour. */
  colour: string;
};

/** A bar from this joint to the next, so the arm reads as one chain whatever the pose. */
const useBar = (to: readonly [number, number, number]) =>
  useMemo(() => {
    const vector = new Vector3(...to);
    const length = vector.length();

    return {
      length,
      position: vector.clone().multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(UP, vector.normalize()),
    };
  }, [to]);

/**
 * One joint and everything beyond it. Each joint's group nests inside its
 * parent's, so rotating a joint carries every link after it.
 */
const Segment: React.FunctionComponent<Props> = ({ attach, colour, index }) => {
  const joint = JOINTS[index];
  const last = index === JOINTS.length - 1;
  const bar = useBar(last ? TOOL : JOINTS[index + 1].origin);

  return (
    <group position={[...joint.origin]} ref={(group) => attach(index, group)}>
      <mesh castShadow rotation-x={joint.axis === 'z' ? Math.PI / 2 : 0}>
        <cylinderGeometry args={[KNUCKLE, KNUCKLE, THICKNESS * 1.4, 24]} />
        <meshStandardMaterial color={COLOURS.joint} />
      </mesh>
      <mesh castShadow position={bar.position} quaternion={bar.quaternion}>
        <boxGeometry args={[THICKNESS, bar.length, THICKNESS]} />
        <meshStandardMaterial color={colour} />
      </mesh>
      {last ? (
        // The pad's face is at TOOL, so its body sits above it; drawn across the face, it sank into what it held.
        <mesh
          castShadow
          position={[TOOL[0], TOOL[1] + PAD_THICKNESS / 2, TOOL[2]]}
        >
          <boxGeometry args={[PAD.width, PAD_THICKNESS, PAD.depth]} />
          <meshStandardMaterial color={COLOURS.pad} />
        </mesh>
      ) : (
        <Segment attach={attach} colour={colour} index={index + 1} />
      )}
    </group>
  );
};

export { Segment };

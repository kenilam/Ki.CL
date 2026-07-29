import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

import NodeAura from './NodeAura';
import { createNodeGeometry, FORM_SCALE, formForRank } from './nodeGeometry';
import { useNodeWorldSize } from './nodeScale';
import { recede, shade } from './palette';

export type NodeRole = 'current' | 'parent' | 'child' | 'ancestor';

/**
 * Size is driven by *depth*, not by role — the tree tapers outward from the
 * root exactly as the branches do, so a node's size says how deep it sits
 * rather than whether it happens to be selected. Role only nudges: the
 * focused body gets a small boost, and its emphasis comes mainly from
 * contrast and from the spine receding around it.
 */
const ROLE_SCALE: Record<NodeRole, number> = {
  current: 1.15,
  parent: 1,
  child: 1,
  ancestor: 1,
};

/**
 * Depth reads as size: the deeper into the tree, the smaller the body, so
 * drilling down feels like descending into finer structure — the same taper
 * the branches follow. Clamped so a deep lineage never vanishes.
 */
const DEPTH_FALLOFF = 0.85;
const MIN_DEPTH_SCALE = 0.34;

function depthScale(depth: number): number {
  return Math.max(MIN_DEPTH_SCALE, DEPTH_FALLOFF ** Math.max(0, depth));
}

/** Relative body multiplier — shared with the label layer so both agree. */
export function nodeBodyScale({
  role,
  rank,
  depth,
  sizeFactor = 1,
}: {
  role: NodeRole;
  rank?: string | null;
  depth: number;
  sizeFactor?: number;
}): number {
  return (
    ROLE_SCALE[role] *
    FORM_SCALE[formForRank(rank)] *
    depthScale(depth) *
    sizeFactor
  );
}

type Props = {
  position: readonly [number, number, number];
  role: NodeRole;
  color: string;
  nodeId: string;
  rank?: string | null;
  /** Distance from the root — deeper bodies render smaller. */
  depth: number;
  /**
   * 0..1 growth. At 0 the body is exactly the radius of the branch tip it
   * sits on, so it emerges from — and collapses back into — the branch.
   */
  scale?: () => number;
  /** World radius of the branch tip feeding this node. */
  tipRadius: number;
  /**
   * The branch this node arrives on. The body rides its growing tip rather
   * than waiting at the destination, so a branch is never drawn with nothing
   * on the end of it — that gap is what read as trailing tails.
   */
  travel?: {
    curve: THREE.Curve<THREE.Vector3>;
    progress: () => number;
  };
  /** Extra shrink for crowded sibling sets; 1 = full spec size. */
  sizeFactor?: number;
  /** 0 = foreground, →1 the deeper into the receding spine it sits. */
  recedeAmount?: number;
  /** The focused node — carries the sonar ripple. */
  isActive?: boolean;
  /** The origin of life — carries the slow breathing halo. */
  isOrigin?: boolean;
  onClick?: () => void;
};

const NodeMarker: React.FunctionComponent<Props> = ({
  position,
  role,
  color,
  nodeId,
  rank,
  depth,
  scale,
  tipRadius,
  travel,
  sizeFactor = 1,
  recedeAmount = 0,
  isActive = false,
  isOrigin = false,
  onClick,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const travelPoint = useRef(new THREE.Vector3());

  const form = useMemo(() => formForRank(rank), [rank]);
  const geometry = useMemo(
    () => createNodeGeometry(nodeId, form),
    [nodeId, form]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);

  // World-space radius, calibrated by NodeScaleProvider so the body measures
  // the intended clamp() size at the framing this route lands on — and then
  // scales with the branches as the camera moves, instead of against them.
  const worldDiameter = useNodeWorldSize();
  const fullRadius =
    (worldDiameter / 2) * nodeBodyScale({ role, rank, depth, sizeFactor });

  /*
   * Recession is a colour move, not an opacity move: the body stays fully
   * opaque and is instead desaturated and lifted toward the page, so a
   * distant ancestor reads as far away rather than see-through.
   */
  const surface = useMemo(
    () => recede(color, recedeAmount),
    [color, recedeAmount]
  );
  const glow = useMemo(() => shade(surface, 18), [surface]);

  Fiber.useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }
    const t = scale ? Math.min(1, Math.max(0, scale())) : 1;
    // Interpolate from the branch tip's own radius, never from zero, so the
    // body appears to swell out of the branch rather than pop into place.
    mesh.scale.setScalar(tipRadius + (fullRadius - tipRadius) * t);
    mesh.visible = t > 0.001;

    const group = groupRef.current;
    if (group && travel) {
      // Branches always grow parent → child, so the tip is simply at `grown`.
      const grown = Math.min(1, Math.max(0, travel.progress()));
      travel.curve.getPointAt(grown, travelPoint.current);
      group.position.copy(travelPoint.current);
    }
  });

  return (
    <group ref={groupRef} position={position as unknown as THREE.Vector3Tuple}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={onClick}
        onPointerOver={() => {
          if (onClick) {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        {/*
          Lambert: purely diffuse, so there is no specular highlight and the
          bodies read as matte biological tissue rather than glossy plastic.
        */}
        <meshLambertMaterial
          color={surface}
          emissive={glow}
          emissiveIntensity={0.3}
        />
      </mesh>

      {isOrigin ? (
        <NodeAura
          variant='origin'
          radius={fullRadius}
          color={surface}
          scale={scale}
        />
      ) : null}
      {isActive ? (
        <NodeAura
          variant='active'
          radius={fullRadius}
          color={surface}
          scale={scale}
        />
      ) : null}
    </group>
  );
};

export default NodeMarker;

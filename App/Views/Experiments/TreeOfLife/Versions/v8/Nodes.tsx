import React, { useLayoutEffect, useMemo, useRef } from 'react';

import THREE, { Drei } from '@/Three';

import { labelFor } from '@/Views/Experiments/TreeOfLife/tree';
import type { LayoutNode } from './layoutEngine';

const BACKGROUND = '#f0ebe3';

type TipInstancesProps = {
  tips: LayoutNode[];
  expandingId: string | null;
  onExpand: (node: LayoutNode) => void;
};

export const TipInstances: React.FunctionComponent<TipInstancesProps> = ({
  tips,
  expandingId,
  onExpand,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const idByIndex = useMemo(() => tips.map((t) => t.id), [tips]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const color = new THREE.Color();
    const dummy = new THREE.Object3D();

    tips.forEach((tip, i) => {
      const [x, y, z] = tip.position;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(expandingId === tip.id ? 1.4 : 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(expandingId === tip.id ? '#ffffff' : tip.color);
      mesh.setColorAt(i, color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [tips, expandingId]);

  if (!tips.length) {
    return null;
  }

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, tips.length]}
      onClick={(event) => {
        event.stopPropagation();
        if (event.instanceId == null) {
          return;
        }
        const tip = tips.find((t) => t.id === idByIndex[event.instanceId!]);
        if (tip) {
          onExpand(tip);
        }
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <sphereGeometry args={[0.12, 12, 12]} />
      <meshStandardMaterial
        roughness={0.4}
        metalness={0.05}
        emissive='#111111'
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
};

export const OriginMarker: React.FunctionComponent<{ node: LayoutNode }> = ({
  node,
}) => {
  const [x, y, z] = node.position;
  const r = Math.max(node.radius, 0.15);

  return (
    <group position={[x, y, z]}>
      {/* Outer membrane */}
      <mesh>
        <sphereGeometry args={[r * 1.35, 32, 24]} />
        <meshPhysicalMaterial
          color='#6bbf8a'
          transmission={0.55}
          thickness={0.6}
          roughness={0.25}
          metalness={0}
          transparent
          opacity={0.55}
          ior={1.35}
        />
      </mesh>
      {/* Cytoplasm */}
      <mesh>
        <sphereGeometry args={[r * 1.05, 28, 20]} />
        <meshStandardMaterial
          color='#3d9b6a'
          roughness={0.55}
          metalness={0.02}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Nucleus — “single cell” core */}
      <mesh position={[r * 0.12, r * 0.08, r * 0.1]}>
        <sphereGeometry args={[r * 0.42, 20, 16]} />
        <meshStandardMaterial
          color='#1b4332'
          emissive='#2d6a4f'
          emissiveIntensity={0.25}
          roughness={0.4}
        />
      </mesh>
      <Drei.Text
        position={[0, -r * 2.4, 0]}
        fontSize={node.fontSize}
        color='#1b4332'
        anchorX='center'
        anchorY='top'
        outlineWidth={0.02}
        outlineColor={BACKGROUND}
      >
        Origin of life
      </Drei.Text>
    </group>
  );
};

export const InternalNodes: React.FunctionComponent<{
  nodes: LayoutNode[];
}> = ({ nodes }) => (
  <group>
    {nodes
      .filter((n) => !n.isTip && !n.isOrigin)
      .map((n) => {
        const [x, y, z] = n.position;
        return (
          <mesh key={n.id} position={[x, y, z]}>
            <sphereGeometry args={[n.radius, 10, 10]} />
            <meshStandardMaterial color={n.color} roughness={0.55} />
          </mesh>
        );
      })}
  </group>
);

export const NodeLabels: React.FunctionComponent<{ nodes: LayoutNode[] }> = ({
  nodes,
}) => (
  <group>
    {nodes
      .filter((n) => n.showLabel && !n.isOrigin)
      .map((n) => {
        const text = labelFor(n.node);
        if (!text) {
          return null;
        }
        const [x, y, z] = n.position;
        return (
          <Drei.Text
            key={`label-${n.id}`}
            position={[x, y + 0.22, z + 0.04]}
            fontSize={n.fontSize}
            color={n.color}
            anchorX='center'
            anchorY='bottom'
            maxWidth={2.4}
            outlineWidth={0.016}
            outlineColor={BACKGROUND}
          >
            {text}
          </Drei.Text>
        );
      })}
  </group>
);

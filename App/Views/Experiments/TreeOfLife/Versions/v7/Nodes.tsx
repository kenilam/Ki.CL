/**
 * Rendering engine - tip / origin nodes
 * InstancedMesh for expandable tips (scales to thousands);
 * origin + labels as discrete meshes.
 */
import React, { useLayoutEffect, useMemo, useRef } from 'react';

import THREE, { Drei } from '@/Three';

import { labelFor } from '@/Views/Experiments/TreeOfLife/tree';
import type { LayoutNode } from './layoutEngine';

const BACKGROUND = '#f7f4ef';

type TipInstancesProps = {
  tips: LayoutNode[];
  expandingId: string | null;
  onExpand: (node: LayoutNode) => void;
};

/**
 * One draw call for all expandable tip markers.
 * Click picking via raycast on the instanced mesh + id map.
 */
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
      const scale = expandingId === tip.id ? 1.35 : 1;
      dummy.scale.setScalar(scale);
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
        const index = event.instanceId;
        if (index == null) {
          return;
        }
        const id = idByIndex[index];
        const tip = tips.find((t) => t.id === id);
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
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshStandardMaterial
        roughness={0.42}
        metalness={0.05}
        emissive='#222222'
        emissiveIntensity={0.35}
      />
    </instancedMesh>
  );
};

type OriginProps = {
  node: LayoutNode;
};

export const OriginMarker: React.FunctionComponent<OriginProps> = ({
  node,
}) => {
  const [x, y, z] = node.position;

  return (
    <group position={[x, y, z]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.58, 0.075, 12, 32]} />
        <meshStandardMaterial color='#2d6a4f' roughness={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color='#40916c'
          emissive='#2d6a4f'
          emissiveIntensity={0.22}
        />
      </mesh>
      <Drei.Text
        position={[0, -0.9, 0.05]}
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

/**
 * Stand-in "illustration" sprites at tips - colored billboard discs.
 * Swap texture maps later for real organism art.
 */
export const TipSprites: React.FunctionComponent<{ tips: LayoutNode[] }> = ({
  tips,
}) => {
  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }
    const gradient = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, []);

  useLayoutEffect(
    () => () => {
      texture?.dispose();
    },
    [texture]
  );

  if (!texture) {
    return null;
  }

  // Only decorate a subset so the canopy stays readable.
  const decorated = tips
    .filter((t) => t.showLabel || t.depth <= 3)
    .slice(0, 48);

  return (
    <group>
      {decorated.map((tip) => {
        const [x, y, z] = tip.position;
        return (
          <sprite
            key={`sprite-${tip.id}`}
            position={[x, y, z + 0.02]}
            scale={[0.45, 0.45, 0.45]}
          >
            <spriteMaterial
              map={texture}
              color={tip.color}
              transparent
              depthWrite={false}
              opacity={0.85}
            />
          </sprite>
        );
      })}
    </group>
  );
};

type LabelsProps = {
  nodes: LayoutNode[];
};

export const NodeLabels: React.FunctionComponent<LabelsProps> = ({ nodes }) => (
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
            position={[x, y + 0.18, z + 0.04]}
            fontSize={n.fontSize}
            color={n.color}
            anchorX='center'
            anchorY='bottom'
            maxWidth={2.6}
            outlineWidth={0.018}
            outlineColor={BACKGROUND}
          >
            {text}
          </Drei.Text>
        );
      })}
  </group>
);

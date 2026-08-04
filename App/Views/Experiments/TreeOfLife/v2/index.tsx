import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import {
  useQuery,
  Kicl_TreeOfLifeSubtreeDocument,
  useLazyQuery,
} from 'api/provider';

import THREE, { Fiber, Drei } from '@/Three';
import { Spinner, Text } from '@/Components';

import {
  type TreeNode,
  ROOT_OTT_ID,
  DEFAULT_HEIGHT_LIMIT,
  mergeSubtree,
  labelFor,
} from '@/Views/Experiments/TreeOfLife/tree';
import { layoutPhylogeneticFan, type LayoutLink } from './layout';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v2';
const BACKGROUND = '#f2efe8';

type BranchProps = {
  link: LayoutLink;
};

/**
 * Tapered tube along an organic curve — tip-weighted fan (v2 snapshot).
 */
const Branch: React.FunctionComponent<BranchProps> = ({ link }) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      link.points.map((p) => new THREE.Vector3(...p)),
      false,
      'catmullrom',
      0.35
    );

    const tubularSegments = Math.max(16, link.points.length * 2);
    const radialSegments = 5;
    const geo = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      1,
      radialSegments,
      false
    );

    const start = link.startWidth;
    const end = link.endWidth;
    const vertsPerRing = radialSegments + 1;
    const rings = tubularSegments + 1;
    const position = geo.attributes.position as THREE.BufferAttribute;
    const center = new THREE.Vector3();

    for (let ring = 0; ring < rings; ring += 1) {
      const t = ring / Math.max(rings - 1, 1);
      const radius = start + (end - start) * t ** 1.35;
      curve.getPoint(t, center);

      for (let j = 0; j < vertsPerRing; j += 1) {
        const idx = ring * vertsPerRing + j;
        if (idx >= position.count) {
          continue;
        }

        const vx = position.getX(idx);
        const vy = position.getY(idx);
        const vz = position.getZ(idx);
        const dx = vx - center.x;
        const dy = vy - center.y;
        const dz = vz - center.z;
        const len = Math.hypot(dx, dy, dz) || 1;

        position.setXYZ(
          idx,
          center.x + (dx / len) * radius,
          center.y + (dy / len) * radius,
          center.z + (dz / len) * radius
        );
      }
    }

    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [link.points, link.startWidth, link.endWidth]);

  useLayoutEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry]
  );

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={link.color}
        roughness={0.72}
        metalness={0.05}
        transparent
        opacity={0.94}
      />
    </mesh>
  );
};

type TaxonProps = {
  x: number;
  y: number;
  z: number;
  color: string;
  label: string;
  showLabel: boolean;
  expandable: boolean;
  fontSize: number;
  isOrigin: boolean;
  highlight: boolean;
  onExpand?: () => void;
};

const Taxon: React.FunctionComponent<TaxonProps> = ({
  x,
  y,
  z,
  color,
  label,
  showLabel,
  expandable,
  fontSize,
  isOrigin,
  highlight,
  onExpand,
}) => {
  const displayLabel = isOrigin ? 'Origin of life' : label;
  const markerSize = isOrigin ? 0.22 : expandable ? 0.1 : 0;

  return (
    <group position={[x, y, z]}>
      {markerSize > 0 ? (
        <mesh
          onClick={(event) => {
            if (!expandable || !onExpand) {
              return;
            }
            event.stopPropagation();
            onExpand();
          }}
          onPointerOver={(event) => {
            if (!expandable) {
              return;
            }
            event.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[markerSize, 16, 16]} />
          <meshStandardMaterial
            color={highlight ? '#ffffff' : isOrigin ? '#2d6a4f' : color}
            emissive={expandable ? color : isOrigin ? '#40916c' : '#000000'}
            emissiveIntensity={expandable ? 0.4 : isOrigin ? 0.15 : 0}
            roughness={0.5}
          />
        </mesh>
      ) : null}
      {showLabel && displayLabel ? (
        <Drei.Text
          position={[0, isOrigin ? -0.45 : 0.14, 0.04]}
          fontSize={fontSize}
          color={isOrigin ? '#1b4332' : color}
          anchorX='center'
          anchorY={isOrigin ? 'top' : 'bottom'}
          maxWidth={3.2}
          outlineWidth={0.018}
          outlineColor={BACKGROUND}
          fillOpacity={0.95}
        >
          {displayLabel}
        </Drei.Text>
      ) : null}
    </group>
  );
};

type SceneProps = {
  tree: TreeNode;
  onExpand: (node: TreeNode) => void;
  expandingId: string | null;
};

const Scene: React.FunctionComponent<SceneProps> = ({
  tree,
  onExpand,
  expandingId,
}) => {
  const { nodes, links, height } = useMemo(
    () => layoutPhylogeneticFan(tree),
    [tree]
  );

  const targetY = height * 0.4;

  return (
    <>
      <ambientLight intensity={0.88} />
      <directionalLight position={[6, 16, 10]} intensity={1.15} />
      <directionalLight
        position={[-8, 4, -4]}
        intensity={0.35}
        color='#b8d4c8'
      />
      <Drei.OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        target={[0, targetY, 0]}
        minDistance={5}
        maxDistance={100}
        maxPolarAngle={Math.PI * 0.82}
      />
      {links.map((link) => (
        <Branch key={link.key} link={link} />
      ))}
      {nodes.map((item) => (
        <Taxon
          key={item.node.nodeId}
          x={item.x}
          y={item.y}
          z={item.z}
          color={item.color}
          label={labelFor(item.node)}
          showLabel={item.showLabel}
          expandable={item.expandable}
          fontSize={item.fontSize}
          isOrigin={item.isOrigin}
          highlight={expandingId === item.node.nodeId}
          onExpand={item.expandable ? () => onExpand(item.node) : undefined}
        />
      ))}
    </>
  );
};

const Canvas: React.FunctionComponent = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [expandingId, setExpandingId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(Kicl_TreeOfLifeSubtreeDocument, {
    variables: {
      ottId: ROOT_OTT_ID,
      heightLimit: DEFAULT_HEIGHT_LIMIT,
    },
  });

  const [fetchSubtree] = useLazyQuery(Kicl_TreeOfLifeSubtreeDocument);

  useEffect(() => {
    const root = data?.TreeOfLifeSubtree;
    if (!root?.nodeId) {
      return;
    }

    setTree((current) => current ?? (root as TreeNode));
  }, [data]);

  const onExpand = async (node: TreeNode) => {
    if (expandingId) {
      return;
    }

    setExpandingId(node.nodeId);

    try {
      const result = await fetchSubtree({
        variables: node.ottId
          ? { ottId: node.ottId, heightLimit: DEFAULT_HEIGHT_LIMIT }
          : { nodeId: node.nodeId, heightLimit: DEFAULT_HEIGHT_LIMIT },
      });

      const subtree = result.data?.TreeOfLifeSubtree as TreeNode | undefined;
      if (subtree?.nodeId) {
        setTree((current) =>
          current ? mergeSubtree(current, subtree) : subtree
        );
      }
    } finally {
      setExpandingId(null);
    }
  };

  if (error) {
    return (
      <Text className={`${CLASS_NAME}__error kicl-color-error`}>
        {error.message}
      </Text>
    );
  }

  if (loading && !tree) {
    return <Spinner />;
  }

  if (!tree) {
    return null;
  }

  return (
    <div className={CLASS_NAME}>
      <Fiber.Canvas
        camera={{ position: [0, 5.5, 20], fov: 40, near: 0.1, far: 220 }}
      >
        <color attach='background' args={[BACKGROUND]} />
        <fog attach='fog' args={[BACKGROUND, 50, 110]} />
        <Scene tree={tree} onExpand={onExpand} expandingId={expandingId} />
      </Fiber.Canvas>
      <Text
        className={`${CLASS_NAME}__hint kicl-font-size-smaller kicl-color-grey-dark kicl-text-align-center`}
      >
        Tip-weighted organic fan (v2) · click glowing tips to grow a clade
      </Text>
    </div>
  );
};

export default Canvas;

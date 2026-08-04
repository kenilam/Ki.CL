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
  mergeSubtree,
  labelFor,
} from '@/Views/Experiments/TreeOfLife/tree';
import { layoutPhylogeneticFan, type LayoutLink } from './layout';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v6';
const BACKGROUND = '#f7f4ef';
/** Deeper initial fetch → denser canopy closer to the poster. */
const HEIGHT_LIMIT = 4;

type BranchProps = {
  link: LayoutLink;
};

const Branch: React.FunctionComponent<BranchProps> = ({ link }) => {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      link.points.map((p) => new THREE.Vector3(...p)),
      false,
      'catmullrom',
      0.45
    );

    const tubularSegments = Math.max(20, link.points.length * 2);
    const radialSegments = 8;
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
      // Keep trunks thick longer, then taper — illustration-like.
      const radius = start + (end - start) * t ** 1.6;
      curve.getPoint(t, center);

      for (let j = 0; j < vertsPerRing; j += 1) {
        const idx = ring * vertsPerRing + j;
        if (idx >= position.count) {
          continue;
        }

        const dx = position.getX(idx) - center.x;
        const dy = position.getY(idx) - center.y;
        const dz = position.getZ(idx) - center.z;
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
        roughness={0.68}
        metalness={0.02}
        transparent
        opacity={0.96}
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

  return (
    <group position={[x, y, z]}>
      {isOrigin ? (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.55, 0.07, 10, 28]} />
            <meshStandardMaterial color='#2d6a4f' roughness={0.55} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color='#40916c'
              emissive='#2d6a4f'
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ) : expandable ? (
        <mesh
          onClick={(event) => {
            if (!onExpand) {
              return;
            }
            event.stopPropagation();
            onExpand();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <sphereGeometry args={[0.09, 14, 14]} />
          <meshStandardMaterial
            color={highlight ? '#ffffff' : color}
            emissive={color}
            emissiveIntensity={0.45}
            roughness={0.45}
          />
        </mesh>
      ) : null}

      {showLabel && displayLabel ? (
        <Drei.Text
          position={[0, isOrigin ? -0.85 : 0.16, 0.05]}
          fontSize={fontSize}
          color={isOrigin ? '#1b4332' : color}
          anchorX='center'
          anchorY={isOrigin ? 'top' : 'bottom'}
          maxWidth={2.8}
          outlineWidth={0.02}
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

  const targetY = height * 0.36;

  return (
    <>
      <ambientLight intensity={0.92} />
      <directionalLight position={[5, 14, 9]} intensity={1.2} />
      <directionalLight
        position={[-10, 3, -5]}
        intensity={0.4}
        color='#c9ddd2'
      />
      <Drei.OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        target={[0, targetY, 0]}
        minDistance={5}
        maxDistance={70}
        maxPolarAngle={Math.PI * 0.8}
      />
      <Drei.PerspectiveCamera
        makeDefault
        position={[0, targetY * 0.45, 19]}
        fov={38}
        near={0.1}
        far={300}
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
      heightLimit: HEIGHT_LIMIT,
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
          ? { ottId: node.ottId, heightLimit: HEIGHT_LIMIT }
          : { nodeId: node.nodeId, heightLimit: HEIGHT_LIMIT },
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
      <Fiber.Canvas>
        <color attach='background' args={[BACKGROUND]} />
        <fog attach='fog' args={[BACKGROUND, 40, 90]} />
        <Scene tree={tree} onExpand={onExpand} expandingId={expandingId} />
      </Fiber.Canvas>
      <Text
        className={`${CLASS_NAME}__hint kicl-font-size-smaller kicl-color-grey-dark kicl-text-align-center`}
      >
        Poster-style organic fan (v6) · click glowing tips to grow a clade
      </Text>
    </div>
  );
};

export default Canvas;

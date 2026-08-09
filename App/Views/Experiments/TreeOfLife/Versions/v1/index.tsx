import React, { useEffect, useMemo, useState } from 'react';

import {
  useQuery,
  Kicl_TreeOfLifeSubtreeDocument,
  useLazyQuery,
} from 'api/provider';

import { Fiber, Drei } from '@/Three';
import { Spinner, Text } from '@/Components';

import {
  type TreeNode,
  ROOT_OTT_ID,
  DEFAULT_HEIGHT_LIMIT,
  mergeSubtree,
  fromSubtreeNode,
  labelFor,
} from '@/Views/Experiments/TreeOfLife/tree';
import { layoutRadialTree } from './layout';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v1';

type BranchProps = {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
};

const Branch: React.FunctionComponent<BranchProps> = ({ from, to, color }) => {
  const points = useMemo(() => [from, to], [from, to]);

  return (
    <Drei.Line
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.85}
    />
  );
};

type TaxonProps = {
  x: number;
  y: number;
  z: number;
  color: string;
  label: string;
  expandable: boolean;
  depth: number;
  onExpand?: () => void;
};

const Taxon: React.FunctionComponent<TaxonProps> = ({
  x,
  y,
  z,
  color,
  label,
  expandable,
  depth,
  onExpand,
}) => {
  const fontSize = depth === 0 ? 0.28 : expandable ? 0.16 : 0.12;
  const markerSize = expandable ? 0.12 : 0.06;

  return (
    <group position={[x, y, z]}>
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
        <sphereGeometry args={[markerSize, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={expandable ? color : '#000000'}
          emissiveIntensity={expandable ? 0.25 : 0}
        />
      </mesh>
      <Drei.Text
        position={[0, markerSize + 0.08, 0]}
        fontSize={fontSize}
        color={color}
        anchorX='center'
        anchorY='bottom'
        maxWidth={2.4}
        overflowWrap='break-word'
      >
        {label}
      </Drei.Text>
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
  const { nodes, links } = useMemo(() => layoutRadialTree(tree), [tree]);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[8, 12, 6]} intensity={1.1} />
      <Drei.OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={80}
      />
      {links.map((link) => (
        <Branch
          key={link.key}
          from={link.from}
          to={link.to}
          color={link.color}
        />
      ))}
      {nodes.map(({ node, x, y, z, color, expandable, depth }) => (
        <Taxon
          key={node.nodeId}
          x={x}
          y={y}
          z={z}
          color={expandingId === node.nodeId ? '#ffffff' : color}
          label={labelFor(node)}
          expandable={expandable}
          depth={depth}
          onExpand={expandable ? () => onExpand(node) : undefined}
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

    setTree((current) => current ?? fromSubtreeNode(root));
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

      const raw = result.data?.TreeOfLifeSubtree;
      const subtree = raw ? fromSubtreeNode(raw) : undefined;
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
      <Fiber.Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
        <Scene tree={tree} onExpand={onExpand} expandingId={expandingId} />
      </Fiber.Canvas>
    </div>
  );
};

export default Canvas;

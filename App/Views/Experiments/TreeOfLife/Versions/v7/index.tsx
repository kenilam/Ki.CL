/**
 * v7 — D3 hierarchy layout engine + R3F / Three.js Bezier render engine
 *
 * Architecture (from the reviewed Option 1 + Option 5 hybrid):
 * 1. layoutEngine  — d3.hierarchy + d3.cluster → positions + CubicBezier specs
 * 2. Branches      — THREE.CubicBezierCurve3 → tapered tubes
 * 3. Nodes         — InstancedMesh tips, origin marker, sprite stand-ins, labels
 */
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
  mergeSubtree,
  fromSubtreeNode,
} from '@/Views/Experiments/TreeOfLife/tree';
import {
  computeTreeLayout,
  HEIGHT_LIMIT_DEFAULT,
  type LayoutNode,
} from './layoutEngine';
import Branches from './Branches';
import { TipInstances, OriginMarker, TipSprites, NodeLabels } from './Nodes';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v7';
const BACKGROUND = '#f7f4ef';

type SceneProps = {
  tree: TreeNode;
  onExpand: (layoutNode: LayoutNode) => void;
  expandingId: string | null;
};

const Scene: React.FunctionComponent<SceneProps> = ({
  tree,
  onExpand,
  expandingId,
}) => {
  const layout = useMemo(() => computeTreeLayout(tree), [tree]);

  const tips = useMemo(
    () => layout.nodes.filter((n) => n.expandable),
    [layout.nodes]
  );
  const origin = layout.nodes.find((n) => n.isOrigin);
  const targetY = layout.height * 0.34;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 14, 10]} intensity={1.2} />
      <directionalLight
        position={[-8, 4, -4]}
        intensity={0.35}
        color='#c5d8cc'
      />

      <Drei.OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        target={[0, targetY, 0]}
        minDistance={5}
        maxDistance={75}
        maxPolarAngle={Math.PI * 0.82}
      />
      <Drei.PerspectiveCamera
        makeDefault
        position={[0, targetY * 0.4, 18]}
        fov={38}
        near={0.1}
        far={300}
      />

      <Branches branches={layout.branches} />
      <TipSprites tips={tips} />
      <TipInstances tips={tips} expandingId={expandingId} onExpand={onExpand} />
      {origin ? <OriginMarker node={origin} /> : null}
      <NodeLabels nodes={layout.nodes} />
    </>
  );
};

const Canvas: React.FunctionComponent = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [expandingId, setExpandingId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(Kicl_TreeOfLifeSubtreeDocument, {
    variables: {
      ottId: ROOT_OTT_ID,
      heightLimit: HEIGHT_LIMIT_DEFAULT,
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

  const onExpand = async (layoutNode: LayoutNode) => {
    if (expandingId) {
      return;
    }

    setExpandingId(layoutNode.id);
    const { node } = layoutNode;

    try {
      const result = await fetchSubtree({
        variables: node.ottId
          ? { ottId: node.ottId, heightLimit: HEIGHT_LIMIT_DEFAULT }
          : { nodeId: node.nodeId, heightLimit: HEIGHT_LIMIT_DEFAULT },
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
      <Fiber.Canvas>
        <fog attach='fog' args={[BACKGROUND, 38, 85]} />
        <Scene tree={tree} onExpand={onExpand} expandingId={expandingId} />
      </Fiber.Canvas>
      <Text
        className={`${CLASS_NAME}__hint kicl-font-size-smaller kicl-color-grey-dark kicl-text-align-center`}
      >
        D3 cluster + CubicBezier branches · click tips to expand
      </Text>
    </div>
  );
};

export default Canvas;

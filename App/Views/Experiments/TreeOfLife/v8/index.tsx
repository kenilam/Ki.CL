/**
 * v8 — Sphere layout from min(canvasW, canvasH); rotatable 3D view.
 * (PhyloPic removed — silhouettes no longer used.)
 */
import React, { useEffect, useMemo, useState } from 'react';

import {
  useKicl_TreeOfLifeSubtree,
  useKicl_TreeOfLifeSubtreeLazyQuery,
} from 'api/provider';

import { Fiber, Drei } from '@/Three';
import { Spinner, Text } from '@/Components';

import {
  type TreeNode,
  ROOT_OTT_ID,
  mergeSubtree,
} from '@/Views/Experiments/TreeOfLife/tree';
import {
  computeBottomUpLayout,
  HEIGHT_LIMIT_DEFAULT,
  type LayoutNode,
  type ViewportSize,
} from './layoutEngine';
import Branches from './Branches';
import { TipInstances, OriginMarker, InternalNodes, NodeLabels } from './Nodes';

import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v8';
const BACKGROUND = '#f0ebe3';

type SceneProps = {
  tree: TreeNode;
  viewport: ViewportSize;
  onExpand: (layoutNode: LayoutNode) => void;
  expandingId: string | null;
};

const Scene: React.FunctionComponent<SceneProps> = ({
  tree,
  viewport,
  onExpand,
  expandingId,
}) => {
  const layout = useMemo(
    () => computeBottomUpLayout(tree, viewport),
    [tree, viewport.width, viewport.height]
  );

  const tips = useMemo(
    () => layout.nodes.filter((n) => n.expandable),
    [layout.nodes]
  );

  const origin = layout.nodes.find(
    (n) =>
      n.isOrigin &&
      (n.node.ottId === ROOT_OTT_ID || n.node.nodeId === `ott${ROOT_OTT_ID}`)
  );
  const R = layout.sphereRadius;
  const cameraDistance = R * 2.75;

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[R, R * 1.4, R]} intensity={1.15} />
      <directionalLight
        position={[-R, -R * 0.4, -R]}
        intensity={0.35}
        color='#c5d4cb'
      />

      <mesh>
        <sphereGeometry args={[R, 32, 24]} />
        <meshBasicMaterial
          color='#9aab9e'
          transparent
          opacity={0.06}
          depthWrite={false}
          wireframe
        />
      </mesh>

      <Drei.PerspectiveCamera
        makeDefault
        position={[0, R * 0.15, cameraDistance]}
        fov={42}
        near={0.1}
        far={R * 20}
      />
      <Drei.OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        target={[0, 0, 0]}
        enableRotate
        minDistance={R * 1.2}
        maxDistance={R * 6}
      />

      <Branches branches={layout.branches} />
      <InternalNodes nodes={layout.nodes} />
      <TipInstances tips={tips} expandingId={expandingId} onExpand={onExpand} />
      {origin ? <OriginMarker node={origin} /> : null}
      <NodeLabels nodes={layout.nodes} />
    </>
  );
};

const ViewportBridge: React.FunctionComponent<{
  tree: TreeNode;
  onExpand: (layoutNode: LayoutNode) => void;
  expandingId: string | null;
}> = ({ tree, onExpand, expandingId }) => {
  const size = Fiber.useThree((s) => s.size);
  const viewport = useMemo<ViewportSize>(
    () => ({
      width: Math.max(size.width, 1),
      height: Math.max(size.height, 1),
    }),
    [size.width, size.height]
  );

  return (
    <Scene
      tree={tree}
      viewport={viewport}
      onExpand={onExpand}
      expandingId={expandingId}
    />
  );
};

const Canvas: React.FunctionComponent = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [expandingId, setExpandingId] = useState<string | null>(null);

  const { data, loading, error } = useKicl_TreeOfLifeSubtree({
    variables: {
      ottId: ROOT_OTT_ID,
      heightLimit: HEIGHT_LIMIT_DEFAULT,
    },
  });

  const [fetchSubtree] = useKicl_TreeOfLifeSubtreeLazyQuery();

  useEffect(() => {
    const root = data?.TreeOfLifeSubtree;
    if (!root?.nodeId) {
      return;
    }
    setTree((current) => current ?? (root as TreeNode));
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
        <ViewportBridge
          tree={tree}
          onExpand={onExpand}
          expandingId={expandingId}
        />
      </Fiber.Canvas>
      <Text
        className={`${CLASS_NAME}__hint kicl-font-size-smaller kicl-color-grey-dark kicl-text-align-center`}
      >
        Sphere from min(canvas W, H) · drag to rotate · tips on the shell
      </Text>
    </div>
  );
};

export default Canvas;

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Fiber } from '@/Three';

import CameraRig, { framingRadius, localGroupRadius } from './CameraRig';
import GlobeCage from './GlobeCage';
import type { LocalGroup } from './graphStore';
import { LabelProjector, type BranchPath, type LabelInput } from './labels';
import Node, { stepForDepth } from './Node';
import { nodeBodyScale } from './NodeMarker';
import { readNodeProgress } from './nodeProgress';
import { NodeScaleProvider } from './nodeScale';
import { ORIGIN, SPHERE_RADIUS } from './positioning';
import {
  buildRenderTree,
  collectKeys,
  pruneToDeparting,
  type NodeRole,
  type RenderNode,
} from './renderTree';
import { sampleBranchCurve } from './taperedTube';
import { ScrollNavigation, type ScrollTarget } from './useScrollNavigation';

type Props = {
  group: LocalGroup;
  onNavigate?: (nodeId: string) => void;
};

/** Growth a node must reach before its label starts fading in. */
const LABEL_REVEAL_AT = 0.8;

const ROLE_PRIORITY: Record<NodeRole, number> = {
  current: 4,
  parent: 3,
  ancestor: 2,
  child: 1,
};

/** Longest root-to-leaf run — what sets a cascade's total length. */
function treeDepth(tree: RenderNode): number {
  return (
    1 + tree.children.reduce((max, child) => Math.max(max, treeDepth(child)), 0)
  );
}

function flatten(tree: RenderNode, into: RenderNode[] = []): RenderNode[] {
  into.push(tree);
  tree.children.forEach((child) => flatten(child, into));
  return into;
}

type Departing = { id: number; tree: RenderNode; epoch: number };

const Scene: React.FunctionComponent<Props> = ({ group, onNavigate }) => {
  const tree = useMemo(() => buildRenderTree(group), [group]);
  const flat = useMemo(() => flatten(tree), [tree]);
  const stepMs = useMemo(() => stepForDepth(treeDepth(tree)), [tree]);

  /*
   * Nodes already on screen when this transition began. Departing subtrees
   * are held mounted here — pruned out of the *previous* tree — until their
   * own inward cascade reports done. Rendering only the current tree would
   * drop them instantly, which is what made navigations rebuild rather than
   * animate.
   *
   * This is frozen for the whole transition rather than recomputed each
   * render, and that matters more than it looks: react-three-fiber commits
   * its subtree on its own schedule, *after* the DOM effects have run. A set
   * recomputed in an effect was therefore already the new tree's keys by the
   * time the nodes actually mounted, so every arriving node mounted as
   * `staying` and the navigation snapped into place instead of growing.
   */
  const surviving = useRef<Set<string>>(new Set());
  const previousTree = useRef<RenderNode | null>(null);
  const focusRef = useRef<string | null>(null);
  const epochRef = useRef(0);
  const departingId = useRef(0);
  const pendingPrune = useRef<RenderNode | null>(null);
  const [departing, setDeparting] = useState<Departing[]>([]);

  /*
   * Only a change of focus is a transition; a data refresh is not. This is
   * derived during render, not in the effect, because the epoch has to be
   * right on the *first* paint of a transition — bumping it an effect later
   * meant every node reset the enter animation it had just begun and landed
   * on `staying`, which is what snapped a navigation into place.
   */
  if (focusRef.current !== group.currentId) {
    focusRef.current = group.currentId;
    epochRef.current += 1;
    pendingPrune.current = previousTree.current;
    surviving.current = previousTree.current
      ? collectKeys(previousTree.current)
      : new Set<string>();
  }
  // Always the most recently rendered tree — read at the next focus change.
  previousTree.current = tree;

  useEffect(() => {
    const prevTree = pendingPrune.current;
    if (prevTree) {
      pendingPrune.current = null;
      const fragments = pruneToDeparting(prevTree, collectKeys(tree));
      if (fragments.length) {
        const epoch = epochRef.current;
        setDeparting((current) => [
          ...current,
          ...fragments.map((fragment) => {
            departingId.current += 1;
            return { id: departingId.current, tree: fragment, epoch };
          }),
        ]);
      }
    }
  }, [tree, group.currentId]);

  const rootPhase = surviving.current.has(tree.key) ? 'staying' : 'entering';

  const groupRadius = useMemo(
    () => Math.sqrt(localGroupRadius(group) * framingRadius(group)),
    [group]
  );

  const scrollTargets = useMemo<ScrollTarget[]>(
    () =>
      flat
        .filter((item) => item.navigable)
        .map((item) => ({ nodeId: item.node.nodeId, position: item.position })),
    [flat]
  );

  const labels = useMemo<LabelInput[]>(
    () =>
      flat
        .filter((item) => item.label)
        .map((item) => ({
          key: item.key,
          text: item.label as string,
          position: item.position,
          priority: ROLE_PRIORITY[item.role],
          bodyScale: nodeBodyScale({
            role: item.role,
            rank: item.node.rank,
            depth: item.depth,
            sizeFactor: item.sizeFactor,
          }),
          // A label belongs to a node that has actually arrived. Its own
          // growth drives it, ramped over the last stretch so the pill lands
          // with the body rather than trailing an empty branch.
          opacity: () => {
            const grown = readNodeProgress(item.key);
            return Math.max(
              0,
              (grown - LABEL_REVEAL_AT) / (1 - LABEL_REVEAL_AT)
            );
          },
        })),
    [flat]
  );

  const branchPaths = useMemo<BranchPath[]>(
    () =>
      flat
        .filter((item) => item.edge)
        .map((item) =>
          sampleBranchCurve(item.edge!.from, item.position, item.edge!.seed)
        ),
    [flat]
  );

  return (
    <Fiber.Canvas
      className='kicl--views--experiments--tree-of-life--v15__stage'
      camera={{ position: [0, 0, SPHERE_RADIUS * 1.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <NodeScaleProvider radius={groupRadius}>
        {/*
          Total incident light near unity — Lambert multiplies the base colour
          by it, so much above 1 clips toward white and throws away the
          inherited palette.
        */}
        <ambientLight intensity={0.7} />
        <hemisphereLight args={['#ffffff', '#c3d2cb', 0.4]} />
        <directionalLight position={[4, 8, 6]} intensity={0.5} />
        <directionalLight
          position={[-6, -3, -5]}
          intensity={0.22}
          color='#cfe8dc'
        />

        <GlobeCage center={ORIGIN} radius={SPHERE_RADIUS} />

        <Node
          item={tree}
          phase={rootPhase}
          epoch={epochRef.current}
          surviving={surviving.current}
          stepMs={stepMs}
          onNavigate={onNavigate}
        />

        {departing.map((entry) => (
          <Node
            key={entry.id}
            item={entry.tree}
            phase='leaving'
            epoch={entry.epoch}
            stepMs={stepForDepth(treeDepth(entry.tree))}
            onExitComplete={() =>
              setDeparting((current) =>
                current.filter((item) => item.id !== entry.id)
              )
            }
          />
        ))}

        <LabelProjector labels={labels} branchPaths={branchPaths} />
        <CameraRig group={group} />

        {onNavigate ? (
          <ScrollNavigation targets={scrollTargets} onCommit={onNavigate} />
        ) : null}
      </NodeScaleProvider>
    </Fiber.Canvas>
  );
};

export default Scene;

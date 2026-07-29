import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { Fiber } from '@/Three';

import Branch from './Branch';
import NodeMarker from './NodeMarker';
import { registerNodeProgress } from './nodeProgress';
import type { RenderNode } from './renderTree';
import { buildBranchCurve } from './taperedTube';

/**
 * One node and the branch it arrives on, rendered recursively.
 *
 * Timing lives here rather than in a central scheduler, so the sequencing is
 * structural instead of arithmetic:
 *
 * - Entering cascades *outward*. A node animates, and only once it is far
 *   enough along does it open a gate for its children.
 * - Leaving cascades *inward*. A node holds a counter of its children and
 *   cannot start retracting until every one of them has reported done — so
 *   "a node never shrinks while anything deeper is still on screen" is
 *   guaranteed by construction rather than by predicting durations. Siblings
 *   all run in parallel, so a 100-child fan costs one level of time, not a
 *   hundred.
 *
 * Completion is reported at HANDOFF_AT rather than at 1.0, which lets levels
 * overlap slightly and reads as one continuous motion. Set it to 1 for
 * strictly serialised levels.
 */

export const BRANCH_GROW_MS = 340;
export const BRANCH_RETRACT_MS = 240;
/** Fraction of its own animation a node completes before handing off. */
const HANDOFF_AT = 0.5;
/** Default gap between one level starting and the next. */
const DEFAULT_STEP_MS = BRANCH_GROW_MS * HANDOFF_AT;
/**
 * A cascade is strictly one level per step, so its total length is
 * proportional to depth. A 17-deep spine fragment at the default step left
 * its outer half standing for two seconds after the new tree was already up —
 * the trailing branches. Deep runs squeeze their levels closer together
 * instead, so the whole cascade fits inside a fixed budget however long the
 * chain is.
 */
const CASCADE_BUDGET_MS = 900;
/** Below this, levels stop reading as sequential and it is just a pop. */
const MIN_STEP_MS = 24;

/** Per-level gap that fits a run of `depth` levels inside the budget. */
export function stepForDepth(depth: number): number {
  return Math.max(
    MIN_STEP_MS,
    Math.min(DEFAULT_STEP_MS, CASCADE_BUDGET_MS / Math.max(1, depth))
  );
}

export type Phase = 'entering' | 'staying' | 'leaving';

type Props = {
  item: RenderNode;
  phase: Phase;
  /**
   * Bumped whenever a new transition begins. A callback stamped with a stale
   * epoch is ignored, so an interrupted cascade can never drive the next one.
   */
  epoch: number;
  /** Keys that survive into the incoming tree — decides child phases. */
  surviving?: Set<string>;
  /** Opens when the render parent is far enough along; null = start at once. */
  gate?: React.MutableRefObject<number | null>;
  /** Gap between this level starting and the next — see stepForDepth. */
  stepMs?: number;
  /** Leaving only: report to the parent's barrier. */
  onExitComplete?: () => void;
  onNavigate?: (nodeId: string) => void;
};

const Node: React.FunctionComponent<Props> = ({
  item,
  phase,
  epoch,
  surviving,
  gate,
  stepMs = DEFAULT_STEP_MS,
  onExitComplete,
  onNavigate,
}) => {
  // Opened for our own children once we are far enough along.
  const childGate = useRef<number | null>(phase === 'staying' ? 0 : null);
  const startedAt = useRef<number | null>(null);
  const handedOff = useRef(false);
  const epochRef = useRef(epoch);

  /*
   * Once a node starts entering it keeps entering until it is fully grown,
   * even if a later render says `staying`. Data keeps arriving after the
   * first paint (the ancestor walk resolves over several hops) and every
   * refresh used to re-mark the in-flight nodes as already present, which is
   * what made a navigation snap into place instead of animating.
   */
  const stillEntering = useRef(phase === 'entering');

  // Exit barrier: how many children still have to report in.
  const pending = useRef(item.children.length);
  const exitStartedAt = useRef<number | null>(
    item.children.length === 0 ? null : null
  );

  if (epochRef.current !== epoch) {
    epochRef.current = epoch;
    startedAt.current = null;
    handedOff.current = false;
    exitStartedAt.current = null;
    pending.current = item.children.length;
    stillEntering.current = phase === 'entering';
    childGate.current = phase === 'staying' ? 0 : null;
  }

  // `leaving` always wins; only a premature `staying` is held off.
  const effectivePhase: Phase =
    phase === 'staying' && stillEntering.current ? 'entering' : phase;

  const curve = useMemo(
    () =>
      item.edge
        ? buildBranchCurve(
            new THREE.Vector3(...item.edge.from),
            new THREE.Vector3(...item.position),
            item.edge.seed
          )
        : null,
    [item.edge, item.position]
  );

  /** A child finished leaving; start our own exit once they all have. */
  const onChildExit = useCallback(() => {
    pending.current -= 1;
    if (pending.current <= 0 && exitStartedAt.current === null) {
      exitStartedAt.current = performance.now();
    }
  }, []);

  // Leaves have nothing to wait for.
  if (
    effectivePhase === 'leaving' &&
    item.children.length === 0 &&
    exitStartedAt.current === null
  ) {
    exitStartedAt.current = performance.now();
  }

  /** 0 = ungrown, 1 = fully extended. Drives branch, body scale and travel. */
  const progress = useCallback((): number => {
    const now = performance.now();

    if (effectivePhase === 'staying') {
      return 1;
    }

    if (effectivePhase === 'leaving') {
      const start = exitStartedAt.current;
      if (start === null) {
        // Still waiting on descendants — stay fully drawn.
        return 1;
      }
      const t = Math.min(1, (now - start) / BRANCH_RETRACT_MS);
      if (
        !handedOff.current &&
        now - start >= Math.min(stepMs, BRANCH_RETRACT_MS)
      ) {
        handedOff.current = true;
        onExitComplete?.();
      }
      return 1 - t;
    }

    // entering
    if (startedAt.current === null) {
      const opened = gate ? gate.current : 0;
      if (opened === null) {
        return 0;
      }
      startedAt.current = now;
    }
    const t = Math.min(1, (now - startedAt.current) / BRANCH_GROW_MS);
    if (!handedOff.current && now - startedAt.current >= stepMs) {
      handedOff.current = true;
      childGate.current = now;
    }
    if (t >= 1) {
      stillEntering.current = false;
    }
    return t;
  }, [effectivePhase, gate, stepMs, onExitComplete]);

  // Keep the accessors ticking even when nothing else re-renders.
  Fiber.useFrame(() => {
    progress();
  });

  // Publish for the label layer, so a label can track its own node.
  useEffect(
    () => registerNodeProgress(item.key, progress),
    [item.key, progress]
  );

  return (
    <>
      {item.edge && curve ? (
        <Branch
          from={item.edge.from}
          to={item.position}
          fromRadius={item.edge.fromRadius}
          toRadius={item.edge.toRadius}
          fromColor={item.edge.fromColor}
          toColor={item.edge.toColor}
          seed={item.edge.seed}
          progress={progress}
        />
      ) : null}

      <NodeMarker
        position={item.position}
        role={item.role}
        color={item.color}
        nodeId={item.node.nodeId}
        rank={item.node.rank}
        depth={item.depth}
        scale={progress}
        tipRadius={item.edge ? item.edge.toRadius : 0}
        travel={curve ? { curve, progress } : undefined}
        sizeFactor={item.sizeFactor}
        recedeAmount={item.recedeAmount}
        isActive={item.role === 'current'}
        isOrigin={item.depth === 0}
        onClick={
          item.navigable && onNavigate
            ? () => onNavigate(item.node.nodeId)
            : undefined
        }
      />

      {item.children.map((child) => (
        <Node
          key={child.key}
          item={child}
          phase={
            effectivePhase === 'leaving'
              ? 'leaving'
              : surviving && !surviving.has(child.key)
                ? 'entering'
                : 'staying'
          }
          epoch={epoch}
          surviving={surviving}
          gate={childGate}
          stepMs={stepMs}
          onExitComplete={
            effectivePhase === 'leaving' ? onChildExit : undefined
          }
          onNavigate={onNavigate}
        />
      ))}
    </>
  );
};

export default Node;

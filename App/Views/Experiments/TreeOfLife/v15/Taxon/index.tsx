import React, { useEffect, useMemo, useRef, useState } from 'react';

import THREE, { Fiber, Three } from '@/Three';

// Context
import { useNavigate } from '@/Router';

import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';
import { ROOT_NODE_ID, toPath } from '@/Views/Experiments/TreeOfLife/constants';
import type { TaxonNode } from '@/Views/Experiments/TreeOfLife/Spec';
import {
  labelWithRank,
  type TreeNode,
} from '@/Views/Experiments/TreeOfLife/tree';

// Aura
import Aura, { type Variant } from './Aura';

// Geometry
import { createBody, createBranch, formForRank, FORM_SCALE } from './geometry';

// Anchors
import { setAnchor } from '@/Views/Experiments/TreeOfLife/v15/anchors';

// Constants
import {
  MIN_SIZE,
  MIN_WIDTH,
} from '@/Views/Experiments/TreeOfLife/v15/constants';

// Labels
import { registerLabel } from '@/Views/Experiments/TreeOfLife/v15/labels';

// Zoom
import { isPulledBack } from '@/Views/Experiments/TreeOfLife/v15/zoom';

// Palette
import { inherit } from './palette';

// Position
import { tipFor } from './position';

// Spec
import * as Spec from './Spec';

/**
 * One taxon: the branch that reaches it, and the body at that branch's tip.
 *
 * Identified by `nodeId` alone — the taxon itself is looked up from the
 * context, so a caller never carries node data around and a taxon can never
 * be drawn from a stale copy of it. Everything else it needs is derived from
 * that id: where its tip lands, the colour it settles on, the silhouette of
 * its body. Ancestors and descendants are somebody else's problem; this draws
 * one segment.
 *
 * Timing is a spring, not a hand-run clock. `play` is the only control: the
 * spring settles out to the tip on `enter` and back into `start` on `exit`,
 * holds untouched while it is undefined, and `onRest` reports arrival or
 * departure. Nothing here counts milliseconds or predicts when a neighbour
 * will be finished.
 */

/** Where along the growth the body starts swelling out of the tip. */
const BODY_AT = 0.55;

/**
 * How many descendants a taxon shows when it is not the one being looked at.
 *
 * Only the focused taxon shows its clade in full. Everything else along the
 * lineage is context, and a context node with a hundred children buries the
 * spine in a thicket — so it shows a handful spread evenly across the list
 * rather than the first few, which would all come from one corner of it.
 */
const CONTEXT_DESCENDANTS = 6;

/** Each generation's branch is thinner, and its body smaller, than its parent. */
const WIDTH_TAPER = 0.72;
const SIZE_TAPER = 0.78;

/**
 * Taper one step, toward a floor rather than through it.
 *
 * A bare multiply compounds: over a real lineage of seventy generations it
 * takes a body from 3.6 units to 5e-8 — a hundred-millionth of a pixel, and
 * because branch length derives from size, it collapses the deep end onto a
 * single point as well. Decaying toward a floor is identical to the multiply
 * while the value is far above it, so the taper still reads at the top, and
 * flattens out smoothly instead of stopping at a kink the way `Math.max` would.
 */
const decay = (value: number, taper: number, floor: number): number =>
  floor + (value - floor) * taper;

/**
 * Stiff and close to critically damped, so a link settles in roughly 120ms.
 *
 * The lineage advances one link per settle — a taxon finishing is what starts
 * the next — so this is the pacing of the whole unfurling, not just of one
 * branch. At the previous 150/26 a deep lineage took the better part of a
 * minute; `friction ≈ 2 * sqrt(tension)` keeps it fast without overshooting
 * into a wobble, which on a growing branch reads as a stumble.
 */
const SPRING = {
  tension: 1400,
  friction: 75,
  precision: 0.002,
};

type GrowingProps = Spec.Props & {
  taxon: TaxonNode;
};

/**
 * Split from the lookup so every hook below runs unconditionally — the "not
 * in the tree" case returns before this is ever mounted, rather than dropping
 * hooks out of a half-rendered component.
 */
const Growing: React.FunctionComponent<GrowingProps> = ({
  taxon,
  nodeId,
  start,
  startColor,
  startWidth,
  endWidth,
  size,
  play,
  onEntered,
  onExited,
}) => {
  const { animate, chains, focus } = useTreeOfLifeContext();
  const navigate = useNavigate();

  /*
   * This taxon's own child on the lineage — the node one step *closer to the
   * focus*.
   *
   * `chains` runs focus → root, so the entry before this one is the way
   * onward. It must always be drawn, whatever the sampling would otherwise
   * do, or the path to the routed taxon is cut. Null for the focus itself,
   * which is the end of the line.
   */
  const previous = useMemo(() => {
    const index = chains.indexOf(taxon.nodeId);

    return index > 0 ? chains[index - 1] : null;
  }, [chains, taxon.nodeId]);

  const branchRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Group>(null);
  // Guards the exit report: a taxon that never arrived has nothing to leave.
  const entered = useRef(false);

  /*
   * Held in a ref so the spring effect does not depend on them.
   *
   * A caller almost always passes a fresh closure — `onEntered={(s) =>
   * extend(index, s)}` — so keeping these in the dependency array restarted
   * every taxon's spring every time any one of them finished. On a long
   * lineage that is quadratic, and it stretched a walk that should take two
   * seconds into half a minute.
   */
  const report = useRef({ onEntered, onExited });
  report.current = { onEntered, onExited };

  /*
   * Which direction this taxon has *finished* running, as opposed to `play`,
   * which is the direction it was asked to run. Undefined until it has
   * settled either way — so it reads as "not arrived yet", not "retracted".
   */
  const [state, setState] = useState<Spec.Props['play']>(undefined);

  /*
   * The origin of life has nothing above it, so there is no branch to arrive
   * on: it simply sits at the centre it was given. Everything growing out of
   * it therefore leaves the centre too, which is what keeps the root centred
   * on the globe rather than one branch-length off it.
   */
  const isRoot = nodeId === ROOT_NODE_ID;

  const color = useMemo(
    () => inherit(startColor, nodeId),
    [startColor, nodeId]
  );

  const tip = useMemo(
    () =>
      isRoot
        ? new THREE.Vector3(...start)
        : tipFor({ start: new THREE.Vector3(...start), nodeId, size }),
    [isRoot, start, nodeId, size]
  );

  const branch = useMemo(
    () =>
      isRoot
        ? null
        : createBranch({
            start: new THREE.Vector3(...start),
            tip,
            startWidth,
            endWidth,
            startColor,
            endColor: color,
            nodeId,
          }),
    [isRoot, start, tip, startWidth, endWidth, startColor, color, nodeId]
  );

  /*
   * The tip as a plain tuple, memoised.
   *
   * Descendants take this as their `start`, and `start` is a dependency of
   * both `tip` and the swept branch geometry. Handing them a fresh array each
   * render — which `tip.toArray()` inline does — invalidated those memos every
   * time anything re-rendered, so every branch in the tree was rebuilt on
   * every render: 7710 sweeps for 300 taxa, and half a second of work on a
   * skip that should be free.
   */
  const anchor = useMemo(() => tip.toArray(), [tip]);

  const form = useMemo(() => formForRank(taxon.rank), [taxon.rank]);
  const body = useMemo(() => createBody(nodeId, form), [nodeId, form]);

  /*
   * Its own name, published for the screen-space layer to place.
   *
   * A taxon is the only thing that knows where its tip ended up — the caller
   * supplies a start and nothing more — so it has to be the one to say. That
   * is also why descendants had no labels before: nothing outside them could
   * name a position for them.
   *
   * Priority decides who wins a contested seat. The routed taxon outranks the
   * origin, which outranks the lineage, which outranks a fan.
   */
  useEffect(() => {
    const text = labelWithRank(taxon as TreeNode, isRoot);

    if (!text) {
      return undefined;
    }

    const priority = (() => {
      if (nodeId === focus) {
        return 4;
      }

      if (isRoot) {
        return 3;
      }

      return chains.includes(nodeId) ? 2 : 1;
    })();

    return registerLabel(nodeId, {
      text,
      position: tip.toArray(),
      priority,
      radius: (size / 2) * FORM_SCALE[form],
      // Only the routed taxon carries an accent, so it means one thing.
      accent: nodeId === focus ? color : undefined,
    });
  }, [taxon, isRoot, nodeId, focus, chains, tip, size, form, color]);

  useEffect(() => setAnchor(nodeId, tip.toArray()), [nodeId, tip]);

  useEffect(() => () => branch?.geometry.dispose(), [branch]);
  useEffect(() => () => body.dispose(), [body]);

  const bodyRadius = (size / 2) * FORM_SCALE[form];

  /*
   * Only two taxa are marked: the one the route is on, and the origin of
   * life. If they are the same taxon the ripple wins — being *here* is the
   * more immediate fact, and running both would have them fight.
   */
  const aura: Variant | null = (() => {
    if (nodeId === focus) {
      return 'active';
    }

    return isRoot ? 'origin' : null;
  })();

  /*
   * The focused taxon shows every descendant; the rest show an even spread of
   * at most `CONTEXT_DESCENDANTS`. Sampling by stride rather than slicing
   * keeps the sample representative of the whole clade — the head of the list
   * is whatever order the server returned, not a meaningful selection.
   *
   * The lineage child is never sampled away. The spine is drawn by this same
   * recursion, so dropping that one child would sever the path to the taxon
   * the route is actually on.
   */
  const descendants = useMemo(() => {
    const all = (taxon.descendants ?? []).filter((child): child is TaxonNode =>
      Boolean(child?.nodeId)
    );

    if (nodeId === focus || all.length <= CONTEXT_DESCENDANTS) {
      return all;
    }

    const stride = all.length / CONTEXT_DESCENDANTS;
    const sampled = Array.from(
      { length: CONTEXT_DESCENDANTS },
      (_, index) => all[Math.floor(index * stride)]
    ).filter((child): child is TaxonNode => Boolean(child));

    const onward = previous
      ? all.find((child) => child.nodeId === previous)
      : undefined;

    if (!onward || sampled.some((child) => child.nodeId === onward.nodeId)) {
      return sampled;
    }

    return [onward, ...sampled.slice(0, CONTEXT_DESCENDANTS - 1)];
  }, [taxon.descendants, previous, nodeId, focus]);

  const [{ grown }, spring] = Three.useSpring(() => ({
    grown: 0,
    config: SPRING,
  }));

  /*
   * Driven imperatively rather than declaratively.
   *
   * As a props object the spring re-applies on every render — and a taxon
   * re-renders whenever its own state changes or a descendant mounts — so a
   * declared `from` kept resetting it to 0 and it never advanced past the
   * first frame. Starting it from an effect runs it exactly once per change
   * of direction, and from wherever it currently sits.
   */
  useEffect(() => {
    if (!play) {
      return;
    }

    spring.start({
      grown: play === 'enter' ? 1 : 0,
      // Held centrally, so the whole tree jumps or plays together.
      immediate: !animate,
      onRest: (result: { value: { grown: number } }) => {
        if (result.value.grown > 0.99) {
          entered.current = true;
          setState('enter');
          report.current.onEntered?.({ position: tip.toArray(), color });

          return;
        }

        if (entered.current) {
          entered.current = false;
          setState('exit');
          report.current.onExited?.({
            position: [...start],
            color: startColor,
          });
        }
      },
    });
  }, [play, animate, spring, tip, color, start, startColor]);

  /*
   * The spring owns the timeline; this only applies its current value to the
   * scene graph.
   *
   * Reveal the sweep a ring at a time — the geometry is built once and only
   * its draw range moves, so a growing branch never rebuilds buffers and never
   * re-renders React. The body rides the *drawn* tip rather than waiting at
   * the destination, so it is carried outward by the branch instead of hanging
   * in mid-air ahead of it.
   */
  Fiber.useFrame(() => {
    const branchMesh = branchRef.current;
    const bodyMesh = bodyRef.current;
    const value = Math.min(1, Math.max(0, grown.get()));

    if (branchMesh && branch) {
      branchMesh.visible = value > 0;
      branchMesh.geometry.setDrawRange(
        0,
        Math.round(branch.steps * value) * branch.indicesPerStep
      );
    }

    if (bodyMesh) {
      // Nothing is drawn at all until the branch has started; an ungrown
      // taxon leaves no trace on the scene.
      bodyMesh.visible = value > 0;

      if (branch) {
        branch.curve.getPointAt(value, bodyMesh.position);
      } else {
        bodyMesh.position.set(tip.x, tip.y, tip.z);
      }

      const emerged = Math.max(0, (value - BODY_AT) / (1 - BODY_AT));

      bodyMesh.scale.setScalar(
        endWidth / 2 + (bodyRadius - endWidth / 2) * emerged
      );

      // Rides with the body rather than sitting at the destination, so the
      // mark travels out on the branch with the thing it is marking.
      auraRef.current?.position.copy(bodyMesh.position);
    }
  });

  return (
    <group>
      {branch ? (
        <mesh ref={branchRef} geometry={branch.geometry}>
          {/* Matte, so branches read as tissue rather than moulded plastic. */}
          <meshLambertMaterial vertexColors side={THREE.DoubleSide} />
        </mesh>
      ) : null}

      {/*
        The body swells out of the branch tip rather than fading in: it starts
        at exactly the width of the tip it grows from, so there is never a
        moment where it hangs in mid-air as a translucent ghost.
      */}
      {/*
        The body is the only thing that takes a pointer — branches are too
        thin to hit reliably, and the aura is deliberately transparent to it.
      */}
      <mesh
        ref={bodyRef}
        geometry={body}
        onClick={(event) => {
          event.stopPropagation();

          /*
           * Inert when the view is fully pulled back. Out there a taxon is a
           * couple of pixels wide and the subject is the lineage rather than
           * any one node in it, so a click is far likelier to be a misfire
           * than a choice.
           */
          if (isPulledBack()) {
            return;
          }

          navigate(toPath(nodeId));
        }}
        onPointerOver={() => {
          document.body.style.cursor = isPulledBack() ? '' : 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
        }}
      >
        <meshLambertMaterial color={color} />
      </mesh>

      {aura ? (
        <group ref={auraRef}>
          <Aura
            variant={aura}
            radius={bodyRadius}
            color={color}
            present={() => grown.get()}
          />
        </group>
      ) : null}

      {/*
        Each descendant starts where this one ends — at the tip it reached, in
        the colour it settled on, at the width its own branch tapered down to
        — so a generation is described entirely by its parent and no level has
        to know how deep it sits.

        A descendant is released only once this taxon has *arrived*: it is
        handed a direction when `state` reaches `enter`, and nothing before
        that. So the tree unfurls a level at a time instead of every branch
        racing at once, and a level that has not been reached yet stays
        untouched rather than half-run.
      */}
      {descendants.map((child) => (
        <Taxon
          key={child.nodeId}
          nodeId={child.nodeId}
          start={anchor}
          startColor={color}
          startWidth={endWidth}
          endWidth={decay(endWidth, WIDTH_TAPER, MIN_WIDTH)}
          size={decay(size, SIZE_TAPER, MIN_SIZE)}
          play={state}
        />
      ))}
    </group>
  );
};

const Taxon: React.FunctionComponent<Spec.Props> = (props) => {
  const { find } = useTreeOfLifeContext();

  const taxon = useMemo(() => find(props.nodeId), [find, props.nodeId]);

  // The subtree in hand does not reach this node — nothing to draw yet.
  if (!taxon) {
    return null;
  }

  return <Growing {...props} taxon={taxon} />;
};

export default Taxon;

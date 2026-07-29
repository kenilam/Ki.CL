/**
 * v14 layout — botanical growth algorithm (not a graph layout).
 *
 * Instead of placing tips first and pulling parents toward the origin, the
 * tree *grows*: a vertical trunk rises from the Origin of Life, then every
 * clade owns a weighted angular sector proportional to its descendants and
 * each branch grows outward from its parent, inheriting direction.
 *
 * Stages (per design brief):
 *   1. grow trunk            — vertical stem out of the origin
 *   2. allocate sectors      — canopy split by descendant weight
 *   3. recursive growth      — children placed relative to parent along sector
 *   4. botanical curvature   — curved start, straight tip
 *   4b. tapered stroke       — end is 80% thinner than start; child inherits parent end
 *   5. illustration margin   — tips reserve canopy space beyond the endpoint
 *   6. adaptive sizing       — species markers scaled by importance
 *   7. sparse labels         — only shallow, high-scoring clades
 */
import { hierarchy, type HierarchyNode } from 'd3-hierarchy';

import type { TreeNode } from '@/Views/Experiments/TreeOfLife/tree';
import {
  colorForName,
  hasUnresolvedChildren,
  isNoiseTaxon,
  kidsOf,
  labelFor,
  paletteColor,
  ROOT_OTT_ID,
} from '@/Views/Experiments/TreeOfLife/tree';

export type Vec2 = [number, number];

export type LayoutNode = {
  id: string;
  node: TreeNode;
  /** Branch joint / layout anchor (where the ribbon ends and children spawn). */
  position: Vec2;
  /** Marker centre — hangs below an inset attachment on a curved pedicel. */
  markerPosition: Vec2;
  /** Curved pedicel path from joint → marker (SVG); empty unless tip. */
  pedicelPath: string;
  /** Pedicel attachment on the branch centreline (SVG); null when no stalk. */
  pedicelAttach: Vec2 | null;
  /** How far the attach sits back from the tip along the incoming branch. */
  pedicelInset: number;
  /** Pedicel stalk length in SVG units; 0 when there is no stalk. */
  pedicelLength: number;
  /** Pedicel stroke width; 0 when there is no stalk (origin / internal). */
  pedicelWidth: number;
  /** Growth direction, radians measured clockwise from straight up. */
  angle: number;
  depth: number;
  /** Depth from the nearest already-settled ancestor (0 = settled / origin). */
  growthDepth: number;
  color: string;
  expandable: boolean;
  showLabel: boolean;
  /** Label anchor, offset outward along the growth direction for tips. */
  labelPosition: Vec2;
  fontSize: number;
  isOrigin: boolean;
  isTip: boolean;
  markerRadius: number;
  /** True when this node appeared in the current layout pass (animate in). */
  isNew: boolean;
  parentId: string | null;
};

export type LayoutBranch = {
  id: string;
  parentId: string;
  childId: string;
  /** Centerline cubic — kept for debugging / future stroke uses. */
  path: string;
  /** Bezier controls for live growth truncation. */
  curve: BranchCurve;
  /** Filled tapered ribbon along the full centerline. */
  ribbonPath: string;
  /** Parent-joint colour (gradient start). */
  startColor: string;
  /** Child-tip colour (gradient end). */
  endColor: string;
  /** Alias of endColor — markers / legacy pin field. */
  color: string;
  /** Width at the parent joint. */
  startWidth: number;
  /** Width at the child tip (≤ startWidth). */
  endWidth: number;
  /** Alias of startWidth — draw-order / legacy pin field. */
  strokeWidth: number;
  growthDepth: number;
  /** Hierarchy depth — used for wind flex (survives settle). */
  depth: number;
  isNew: boolean;
};

export type LayoutResult = {
  nodes: LayoutNode[];
  branches: LayoutBranch[];
  width: number;
  height: number;
};

export type ViewportSize = {
  width: number;
  height: number;
};

const MAX_CHILDREN = 12;
/** Soft cap on drawn tips — prefer large clades so animals/plants stay visible. */
const MAX_TIPS = 120;
const HEIGHT_LIMIT_DEFAULT = 3;

/** Full canopy opening, degrees, symmetric about vertical. */
const CANOPY_SPAN_DEG = 200;
/** Trunk length in layout units before the canopy fans out. */
const TRUNK_HEIGHT = 200;
/** Branch shortens by this factor per depth — keep close to 1 so tips don't stack. */
const DEPTH_DECAY = 0.94;
/** Tips reserve this much canopy beyond their branch endpoint (layout units). */
const ILLUSTRATION_OFFSET = 36;
/** Short stalk from branch joint to the marker (layout units, scaled by marker). */
const PEDICEL_BASE = 3.5;
/** Pull pedicel attachment back from the branch tip toward the parent. */
const PEDICEL_INSET_BASE = 4;
/** Minimum angular wedge per sibling so fans don't collapse into combs. */
const MIN_SECTOR_DEG = 5.5;
/** Soft floor share so small clades still get readable space. */
const SECTOR_BASE_WEIGHT = 0.55;
/** Target tip separation in layout units before the viewport fit. */
const TIP_MIN_DIST = 28;
const TIP_REPULSION_ITERS = 48;
/** Maximum labelled clades we allow (sparse, poster-like). */
const MAX_LABELS = 40;

const DEG = Math.PI / 180;

type Vec = { x: number; y: number };

/** Extra per-node layout metadata, kept off the shared TreeNode type. */
type Meta = {
  tips: number;
  sectorStart: number;
  sectorEnd: number;
  angle: number;
  pos: Vec;
};

function isAbsoluteOrigin(node: TreeNode): boolean {
  return node.ottId === ROOT_OTT_ID || node.nodeId === `ott${ROOT_OTT_ID}`;
}

function isPriorityClade(name: string | null | undefined): boolean {
  if (!name) {
    return false;
  }
  return /^(metazoa|animalia|opisthokonta|chordata|vertebrata|arthropoda|mammalia|aves|insecta|mollusca|cnidaria|fungi|viridiplantae|chloroplastida|embryophyta|streptophyta|plantae|eukaryota|bacteria|archaea)\b/i.test(
    name.trim()
  );
}

function tipScore(node: TreeNode): number {
  let score = Math.log10((node.numTips ?? 1) + 10) * 10;
  if (node.ottId) {
    score += 20;
  }
  if (labelFor(node)) {
    score += 15;
  }
  if (isPriorityClade(node.name)) {
    score += 50;
  }
  if (isNoiseTaxon(node.name)) {
    score -= 40;
  }
  return score;
}

// ---------------------------------------------------------------------------
// Pruning — keep the drawn tree readable before we grow it.
// ---------------------------------------------------------------------------

function pruneForPoster(node: TreeNode, prefer?: Set<string>): TreeNode {
  const kids = kidsOf(node);
  if (!kids?.length) {
    return { ...node, children: null, descendants: null };
  }
  const sorted = [...kids].sort((a, b) => {
    const aPref = prefer?.has(a.nodeId) ? 1 : 0;
    const bPref = prefer?.has(b.nodeId) ? 1 : 0;
    if (aPref !== bPref) {
      return bPref - aPref;
    }
    return tipScore(b) - tipScore(a) || (b.numTips ?? 0) - (a.numTips ?? 0);
  });
  // Always keep preferred children even if over the soft cap.
  const preferred = sorted.filter((c) => prefer?.has(c.nodeId));
  const rest = sorted.filter((c) => !prefer?.has(c.nodeId));
  const room = Math.max(0, MAX_CHILDREN - preferred.length);
  const kept = [...preferred, ...rest.slice(0, room)].map((c) =>
    pruneForPoster(c, prefer)
  );
  return { ...node, children: kept, descendants: kept };
}

function capTips(
  root: HierarchyNode<TreeNode>,
  prefer?: Set<string>
): Set<string> {
  const ranked = [...root.leaves()].sort(
    (a, b) => tipScore(b.data) - tipScore(a.data)
  );
  const keep = new Set<string>();
  const byId = new Map<string, HierarchyNode<TreeNode>>();
  root.each((node) => {
    byId.set(node.data.nodeId, node);
  });

  // Preserve anything already on screen. If a prior tip was expanded, keep
  // all of its new leaves so the append is visible.
  prefer?.forEach((id) => {
    const node = byId.get(id);
    if (!node) {
      return;
    }
    if (!node.children?.length) {
      keep.add(id);
      return;
    }
    node.leaves().forEach((leaf) => {
      keep.add(leaf.data.nodeId);
    });
  });

  for (const leaf of ranked) {
    if (keep.size >= Math.max(MAX_TIPS, prefer?.size ?? 0) + 24) {
      break;
    }
    if (isNoiseTaxon(leaf.data.name) && keep.size > MAX_TIPS * 0.55) {
      continue;
    }
    keep.add(leaf.data.nodeId);
  }
  (root.children ?? []).forEach((child) => {
    const best = child
      .leaves()
      .sort((a, b) => tipScore(b.data) - tipScore(a.data))[0];
    if (best) {
      keep.add(best.data.nodeId);
    }
  });
  return keep;
}

function filterToKeptTips(
  node: HierarchyNode<TreeNode>,
  keep: Set<string>
): TreeNode | null {
  if (!node.children?.length) {
    return keep.has(node.data.nodeId)
      ? { ...node.data, children: null, descendants: null }
      : null;
  }
  const children = node.children
    .map((c) => filterToKeptTips(c, keep))
    .filter((c): c is TreeNode => c != null);
  if (!children.length) {
    return keep.has(node.data.nodeId)
      ? { ...node.data, children: null, descendants: null }
      : null;
  }
  // Collapse anonymous single-child chains so the trunk reads cleanly.
  if (children.length === 1 && node.depth > 0) {
    const only = children[0];
    if (!labelFor(node.data) || isNoiseTaxon(node.data.name)) {
      return only;
    }
  }
  return { ...node.data, children, descendants: children };
}

// ---------------------------------------------------------------------------
// Stage 0 — subtree weights (annotate tips)
// ---------------------------------------------------------------------------

function annotate(
  node: HierarchyNode<TreeNode>,
  meta: Map<string, Meta>
): number {
  const blank: Meta = {
    tips: 1,
    sectorStart: 0,
    sectorEnd: 0,
    angle: 0,
    pos: { x: 0, y: 0 },
  };
  if (!node.children?.length) {
    meta.set(node.data.nodeId, { ...blank, tips: 1 });
    return 1;
  }
  const tips = node.children.reduce(
    (sum, child) => sum + annotate(child, meta),
    0
  );
  meta.set(node.data.nodeId, { ...blank, tips });
  return tips;
}

// ---------------------------------------------------------------------------
// Stage 2 — allocate angular sectors by descendant weight
// ---------------------------------------------------------------------------

function allocateSectors(
  node: HierarchyNode<TreeNode>,
  start: number,
  end: number,
  meta: Map<string, Meta>
): void {
  const m = meta.get(node.data.nodeId)!;
  m.sectorStart = start;
  m.sectorEnd = end;
  m.angle = (start + end) / 2;

  const children = node.children ?? [];
  if (!children.length) {
    return;
  }

  const span = end - start;
  const minPad = MIN_SECTOR_DEG * DEG;
  // Soften tip-count dominance and guarantee every sibling a readable wedge.
  const weights = children.map((child) => {
    const tips = meta.get(child.data.nodeId)!.tips;
    return SECTOR_BASE_WEIGHT + Math.sqrt(tips);
  });
  const weightTotal = weights.reduce((a, b) => a + b, 0);
  const reserved = minPad * children.length;

  let cursor = start;
  if (reserved >= span * 0.92) {
    // Too many siblings for padding — split the span evenly.
    const each = span / children.length;
    children.forEach((child) => {
      allocateSectors(child, cursor, cursor + each, meta);
      cursor += each;
    });
    return;
  }

  const free = span - reserved;
  children.forEach((child, index) => {
    const childSpan = minPad + free * (weights[index] / weightTotal);
    allocateSectors(child, cursor, cursor + childSpan, meta);
    cursor += childSpan;
  });
}

// ---------------------------------------------------------------------------
// Stage 3 — recursive growth: children placed relative to parent
// ---------------------------------------------------------------------------

/** Larger clades grow longer branches; deeper branches shorten gently. */
function branchLength(tips: number, depth: number, siblingIndex = 0): number {
  const base = 48 + Math.log2(tips + 1) * 22;
  // Stagger siblings so tips don't sit on the same arc (comb effect).
  const stagger = 1 + ((siblingIndex % 3) - 1) * 0.22;
  return base * DEPTH_DECAY ** Math.max(0, depth - 1) * stagger;
}

/** Direction unit vector for an angle measured clockwise from straight up. */
function dir(angle: number): Vec {
  return { x: Math.sin(angle), y: Math.cos(angle) };
}

function layoutNode(
  node: HierarchyNode<TreeNode>,
  base: Vec,
  meta: Map<string, Meta>
): void {
  const m = meta.get(node.data.nodeId)!;
  m.pos = base;

  const children = node.children ?? [];
  children.forEach((child, index) => {
    const cm = meta.get(child.data.nodeId)!;
    const len = branchLength(cm.tips, child.depth, index);
    const d = dir(cm.angle);
    const childBase: Vec = {
      x: base.x + d.x * len,
      y: base.y + d.y * len,
    };
    layoutNode(child, childBase, meta);
  });
}

/** Push tips apart so dense fans open up before the viewport fit. */
function separateTips(
  root: HierarchyNode<TreeNode>,
  meta: Map<string, Meta>
): void {
  const tips = root.leaves().map((leaf) => meta.get(leaf.data.nodeId)!);
  if (tips.length < 2) {
    return;
  }

  for (let iter = 0; iter < TIP_REPULSION_ITERS; iter += 1) {
    const strength = 1 - iter / TIP_REPULSION_ITERS;
    for (let i = 0; i < tips.length; i += 1) {
      for (let j = i + 1; j < tips.length; j += 1) {
        const a = tips[i];
        const b = tips[j];
        const dx = a.pos.x - b.pos.x;
        const dy = a.pos.y - b.pos.y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        if (dist >= TIP_MIN_DIST) {
          continue;
        }
        const push = ((TIP_MIN_DIST - dist) / TIP_MIN_DIST) * 0.45 * strength;
        const ux = (dx / dist) * push * TIP_MIN_DIST * 0.5;
        const uy = (dy / dist) * push * TIP_MIN_DIST * 0.5;
        a.pos.x += ux;
        a.pos.y += uy;
        b.pos.x -= ux;
        b.pos.y -= uy;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Stage 4 — botanical branch curvature (curved start, straight tip) + taper
// ---------------------------------------------------------------------------

/** Floor for the thinnest branch tip (layout / SVG units ≈ px at 1×). */
const MIN_BRANCH_WIDTH = 1;
/** End width as a fraction of start — 0.8 ⇒ end is 80% of start (20% thinner). */
const BRANCH_TAPER = 0.5;

export type BranchCurve = {
  p0: Vec2;
  c1: Vec2;
  c2: Vec2;
  p3: Vec2;
};

function branchCurve(parent: Vec2, child: Vec2): BranchCurve {
  const [px, py] = parent;
  const [cx, cy] = child;
  const dx = cx - px;
  const dy = cy - py;
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  // Curl inward toward the trunk (sign opposite horizontal splay).
  const side = dx >= 0 ? -1 : 1;
  const nx = -uy * side;
  const ny = ux * side;

  // Curved exit: first control sweeps inward so the branch leaves with a bend.
  const curl = d * 0.12;
  const c1: Vec2 = [
    px + ux * d * 0.35 + nx * curl,
    py + uy * d * 0.35 + ny * curl,
  ];
  // Straight tip: second control sits on the growth line so the end arrives
  // without a hook.
  const c2: Vec2 = [cx - ux * d * 0.42, cy - uy * d * 0.42];

  return { p0: [px, py], c1, c2, p3: [cx, cy] };
}

function branchPath(curve: BranchCurve): string {
  const { p0, c1, c2, p3 } = curve;
  return `M ${p0[0]} ${p0[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p3[0]} ${p3[1]}`;
}

function cubicAt(curve: BranchCurve, t: number): Vec2 {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  const a = mt2 * mt;
  const b = 3 * mt2 * t;
  const c = 3 * mt * t2;
  const d = t2 * t;
  const { p0, c1, c2, p3 } = curve;
  return [
    a * p0[0] + b * c1[0] + c * c2[0] + d * p3[0],
    a * p0[1] + b * c1[1] + c * c2[1] + d * p3[1],
  ];
}

export { cubicAt };

export function cubicDeriv(curve: BranchCurve, t: number): Vec2 {
  const mt = 1 - t;
  const { p0, c1, c2, p3 } = curve;
  return [
    3 * mt * mt * (c1[0] - p0[0]) +
      6 * mt * t * (c2[0] - c1[0]) +
      3 * t * t * (p3[0] - c2[0]),
    3 * mt * mt * (c1[1] - p0[1]) +
      6 * mt * t * (c2[1] - c1[1]) +
      3 * t * t * (p3[1] - c2[1]),
  ];
}

/**
 * Filled outline that tapers from startWidth → endWidth along the cubic.
 * Pass `tEnd` < 1 to draw only the grown prefix (for the draw-on animation).
 * Tip is a round cap; the base stays flat so it sits under the parent joint.
 */
export function taperedRibbonPath(
  curve: BranchCurve,
  startWidth: number,
  endWidth: number,
  tEnd = 1,
  samples = 24
): string {
  const end = Math.max(0.001, Math.min(1, tEnd));
  const count = Math.max(2, Math.ceil(samples * end));
  const left: Vec2[] = [];
  const right: Vec2[] = [];

  for (let i = 0; i <= count; i += 1) {
    const t = (i / count) * end;
    const [x, y] = cubicAt(curve, t);
    const [dx, dy] = cubicDeriv(curve, t);
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const half = (startWidth + (endWidth - startWidth) * t) / 2;
    left.push([x + nx * half, y + ny * half]);
    right.push([x - nx * half, y - ny * half]);
  }

  let d = `M ${left[0][0]} ${left[0][1]}`;
  for (let i = 1; i < left.length; i += 1) {
    d += ` L ${left[i][0]} ${left[i][1]}`;
  }

  const [lx, ly] = left[left.length - 1];
  const [rx, ry] = right[right.length - 1];
  const tipHalf = Math.max(
    0.5,
    (startWidth + (endWidth - startWidth) * end) / 2
  );
  const [tdx, tdy] = cubicDeriv(curve, end);
  const tlen = Math.hypot(tdx, tdy) || 1;
  // Sweep so the arc bulges outward along the growth tangent.
  const cross = (rx - lx) * (tdy / tlen) - (ry - ly) * (tdx / tlen);
  const sweep = cross >= 0 ? 0 : 1;
  d += ` A ${tipHalf} ${tipHalf} 0 0 ${sweep} ${rx} ${ry}`;

  for (let i = right.length - 2; i >= 0; i -= 1) {
    d += ` L ${right[i][0]} ${right[i][1]}`;
  }
  return `${d} Z`;
}

function stemStartWidth(tips: number): number {
  // Trunk starts modestly above the tip floor so the first segment still tapers.
  return Math.max(
    MIN_BRANCH_WIDTH * 1.75,
    Math.min(14, 7 + Math.log2(tips + 1) * 1.6)
  );
}

function taperEndWidth(startWidth: number): number {
  return Math.max(MIN_BRANCH_WIDTH, startWidth * BRANCH_TAPER);
}

// ---------------------------------------------------------------------------
// Stage 6 — adaptive marker sizing
// ---------------------------------------------------------------------------

function markerRadiusFor(
  node: HierarchyNode<TreeNode>,
  isTip: boolean
): number {
  const tips = node.data.numTips ?? node.leaves().length;
  if (isTip) {
    return Math.min(8, 2.6 + Math.log2(tips + 1) * 0.8);
  }
  return Math.max(2.8, Math.min(6, 2.4 + Math.log2(tips + 1) * 0.5));
}

/** Marker must cover the ribbon joint (half-width + a little padding). */
function markerRadiusForJoint(baseRadius: number, jointWidth: number): number {
  return Math.max(baseRadius, jointWidth * 0.62);
}

function pedicelLengthFor(markerRadius: number, jointWidth: number): number {
  return PEDICEL_BASE + markerRadius * 0.7 + jointWidth * 0.22;
}

function pedicelWidthFor(markerRadius: number, jointWidth: number): number {
  return Math.max(
    MIN_BRANCH_WIDTH * 0.85,
    Math.min(jointWidth * 0.7, markerRadius * 0.9)
  );
}

function pedicelInsetFor(markerRadius: number, jointWidth: number): number {
  return PEDICEL_INSET_BASE + markerRadius * 0.45 + jointWidth * 0.35;
}

/**
 * Drooping pedicel from an attach point that already sits on the branch
 * centreline (SVG). Hangs downward with a soft inward bow.
 */
export function hangPedicelPoints(
  attachSvg: Vec2,
  angle: number,
  length: number,
  seed: string
): { markerSvg: Vec2; controlSvg: Vec2 } {
  const growth = dir(angle);
  // Hang inward (toward trunk) with light per-node jitter.
  // SVG y grows downward, so +y is the hanging direction.
  const lean = -growth.x * 0.45 + (hash01(seed, 11) - 0.5) * 0.28;
  const markerSvg: Vec2 = [
    attachSvg[0] + lean * length * 0.55,
    attachSvg[1] + length,
  ];
  const controlSvg: Vec2 = [
    attachSvg[0] - growth.x * length * 0.12 + lean * length * 0.35,
    attachSvg[1] + length * 0.22,
  ];
  return { markerSvg, controlSvg };
}

export function hangPedicel(
  attachSvg: Vec2,
  angle: number,
  length: number,
  seed: string
): { markerSvg: Vec2; path: string } {
  const { markerSvg, controlSvg } = hangPedicelPoints(
    attachSvg,
    angle,
    length,
    seed
  );
  return {
    markerSvg,
    path: `M ${attachSvg[0]} ${attachSvg[1]} Q ${controlSvg[0]} ${controlSvg[1]}, ${markerSvg[0]} ${markerSvg[1]}`,
  };
}

/**
 * Triangulated tapered ribbon (same silhouette as `taperedRibbonPath`).
 * Vertex stride: x, y, r, g, b, a (6 floats). Colours lerp start→end by t.
 */
export function taperedRibbonMesh(
  curve: BranchCurve,
  startWidth: number,
  endWidth: number,
  startRgb: [number, number, number],
  endRgb: [number, number, number],
  alpha: number,
  tEnd = 1,
  samples = 24,
  out: number[] = []
): number[] {
  const end = Math.max(0.001, Math.min(1, tEnd));
  const count = Math.max(2, Math.ceil(samples * end));
  const left: Vec2[] = [];
  const right: Vec2[] = [];
  const ts: number[] = [];

  for (let i = 0; i <= count; i += 1) {
    const t = (i / count) * end;
    const [x, y] = cubicAt(curve, t);
    const [dx, dy] = cubicDeriv(curve, t);
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const half = (startWidth + (endWidth - startWidth) * t) / 2;
    left.push([x + nx * half, y + ny * half]);
    right.push([x - nx * half, y - ny * half]);
    ts.push(t);
  }

  const pushVert = (p: Vec2, t: number) => {
    const u = t / end;
    out.push(
      p[0],
      p[1],
      startRgb[0] + (endRgb[0] - startRgb[0]) * u,
      startRgb[1] + (endRgb[1] - startRgb[1]) * u,
      startRgb[2] + (endRgb[2] - startRgb[2]) * u,
      alpha
    );
  };

  for (let i = 0; i < count; i += 1) {
    pushVert(left[i]!, ts[i]!);
    pushVert(right[i]!, ts[i]!);
    pushVert(left[i + 1]!, ts[i + 1]!);
    pushVert(right[i]!, ts[i]!);
    pushVert(right[i + 1]!, ts[i + 1]!);
    pushVert(left[i + 1]!, ts[i + 1]!);
  }

  // Round tip cap (matches SVG arc bulge along growth tangent).
  const [lx, ly] = left[left.length - 1]!;
  const [rx, ry] = right[right.length - 1]!;
  const tipHalf = Math.max(
    0.5,
    (startWidth + (endWidth - startWidth) * end) / 2
  );
  const [tdx, tdy] = cubicDeriv(curve, end);
  const tlen = Math.hypot(tdx, tdy) || 1;
  const tx = tdx / tlen;
  const ty = tdy / tlen;
  const mx = (lx + rx) / 2;
  const my = (ly + ry) / 2;
  const hx = (rx - lx) / 2;
  const hy = (ry - ly) / 2;
  const tipSegs = 10;
  for (let i = 0; i < tipSegs; i += 1) {
    const a0 = Math.PI * (i / tipSegs);
    const a1 = Math.PI * ((i + 1) / tipSegs);
    const q0: Vec2 = [
      mx - hx * Math.cos(a0) + tx * tipHalf * Math.sin(a0),
      my - hy * Math.cos(a0) + ty * tipHalf * Math.sin(a0),
    ];
    const q1: Vec2 = [
      mx - hx * Math.cos(a1) + tx * tipHalf * Math.sin(a1),
      my - hy * Math.cos(a1) + ty * tipHalf * Math.sin(a1),
    ];
    pushVert([mx, my], end);
    pushVert(q0, end);
    pushVert(q1, end);
  }

  return out;
}

/** Stroke a quadratic pedicel as a short tapered strip. */
export function quadraticStrokeMesh(
  p0: Vec2,
  c: Vec2,
  p1: Vec2,
  width: number,
  rgb: [number, number, number],
  alpha: number,
  tEnd = 1,
  samples = 12,
  out: number[] = []
): number[] {
  const end = Math.max(0.001, Math.min(1, tEnd));
  const count = Math.max(2, Math.ceil(samples * end));
  const points: Vec2[] = [];
  for (let i = 0; i <= count; i += 1) {
    const t = (i / count) * end;
    const mt = 1 - t;
    points.push([
      mt * mt * p0[0] + 2 * mt * t * c[0] + t * t * p1[0],
      mt * mt * p0[1] + 2 * mt * t * c[1] + t * t * p1[1],
    ]);
  }
  const half = width / 2;
  const push = (x: number, y: number) => {
    out.push(x, y, rgb[0], rgb[1], rgb[2], alpha);
  };
  for (let i = 0; i < count; i += 1) {
    const a = points[i]!;
    const b = points[i + 1]!;
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = (-dy / len) * half;
    const ny = (dx / len) * half;
    push(a[0] + nx, a[1] + ny);
    push(a[0] - nx, a[1] - ny);
    push(b[0] + nx, b[1] + ny);
    push(a[0] - nx, a[1] - ny);
    push(b[0] - nx, b[1] - ny);
    push(b[0] + nx, b[1] + ny);
  }
  // Round caps
  const cap = (p: Vec2, tangent: Vec2) => {
    const tlen = Math.hypot(tangent[0], tangent[1]) || 1;
    const tx = tangent[0] / tlen;
    const ty = tangent[1] / tlen;
    const px = -ty;
    const py = tx;
    const segs = 8;
    for (let i = 0; i < segs; i += 1) {
      const a0 = (i / segs) * Math.PI - Math.PI / 2;
      const a1 = ((i + 1) / segs) * Math.PI - Math.PI / 2;
      const q0: Vec2 = [
        p[0] + Math.cos(a0) * px * half + Math.sin(a0) * tx * half,
        p[1] + Math.cos(a0) * py * half + Math.sin(a0) * ty * half,
      ];
      const q1: Vec2 = [
        p[0] + Math.cos(a1) * px * half + Math.sin(a1) * tx * half,
        p[1] + Math.cos(a1) * py * half + Math.sin(a1) * ty * half,
      ];
      push(p[0], p[1]);
      push(q0[0], q0[1]);
      push(q1[0], q1[1]);
    }
  };
  if (points.length >= 2) {
    const first = points[0]!;
    const second = points[1]!;
    const last = points[points.length - 1]!;
    const prev = points[points.length - 2]!;
    cap(first, [first[0] - second[0], first[1] - second[1]]);
    cap(last, [last[0] - prev[0], last[1] - prev[1]]);
  }
  return out;
}

/** Sample near the tip so the stalk reads as attached to the ribbon end. */
export function pedicelAttachOnCurve(curve: BranchCurve, inset: number): Vec2 {
  return cubicAt(curve, pedicelAttachT(curve, inset));
}

/** Parametric t for pedicel attach (clamped to a live growth tip via `tEnd`). */
export function pedicelAttachT(
  curve: BranchCurve,
  inset: number,
  tEnd = 1
): number {
  const [x0, y0] = curve.p0;
  const [x3, y3] = curve.p3;
  const chord = Math.hypot(x3 - x0, y3 - y0) || 1;
  const tNom = Math.max(0.9, 1 - Math.min(0.1, inset / chord));
  return Math.min(Math.max(0.02, tEnd), tNom);
}

// ---------------------------------------------------------------------------
// Colour resolution — inherit named clade colour, else palette by lane.
// New nodes shift within the parent's spectrum; pinned nodes keep exact colour.
// ---------------------------------------------------------------------------

function hash01(id: string, salt = 0): number {
  let h = salt * 374761393 + 1;
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(h ^ id.charCodeAt(i), 1103515245);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace('#', '');
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) {
    return [0, 0, l];
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;

  if (max === rr) {
    h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
  } else if (max === gg) {
    h = ((bb - rr) / d + 2) / 6;
  } else {
    h = ((rr - gg) / d + 4) / 6;
  }
  return [h * 360, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  let rr = 0;
  let gg = 0;
  let bb = 0;
  if (hue < 60) {
    rr = c;
    gg = x;
  } else if (hue < 120) {
    rr = x;
    gg = c;
  } else if (hue < 180) {
    gg = c;
    bb = x;
  } else if (hue < 240) {
    gg = x;
    bb = c;
  } else if (hue < 300) {
    rr = x;
    bb = c;
  } else {
    rr = c;
    bb = x;
  }
  const to = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${to(rr)}${to(gg)}${to(bb)}`;
}

/** Nearby shade in the same hue family — distinct but related. */
export function spectrumVariant(baseHex: string, seed: string): string {
  const [r, g, b] = hexToRgb(baseHex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const t = hash01(seed, 3);
  const u = hash01(seed, 7);
  const h2 = h + (t - 0.5) * 42;
  const s2 = Math.min(0.82, Math.max(0.28, s + (u - 0.5) * 0.18));
  const l2 = Math.min(0.58, Math.max(0.2, l + (t - u) * 0.14));
  return hslToHex(h2, s2, l2);
}

/** Slightly darker solid for node markers vs the branch tip colour. */
export function darkenHex(hex: string, amount = 0.18): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  return hslToHex(h, Math.min(1, s * 1.05), Math.max(0.08, l * (1 - amount)));
}

function resolveColor(node: HierarchyNode<TreeNode>): string {
  let current: HierarchyNode<TreeNode> | null = node;
  while (current) {
    const named = colorForName(current.data.name);
    if (named) {
      return named;
    }
    current = current.parent;
  }
  let lane: HierarchyNode<TreeNode> = node;
  while (lane.parent && lane.parent.depth > 0) {
    lane = lane.parent;
  }
  const siblings = lane.parent?.children ?? [];
  const index = siblings.findIndex((c) => c.data.nodeId === lane.data.nodeId);
  return paletteColor(Math.max(0, index));
}

// ---------------------------------------------------------------------------
// Stage 7 — sparse label strategy
// ---------------------------------------------------------------------------

function pickLabels(root: HierarchyNode<TreeNode>): Set<string> {
  const labelled = new Set<string>();
  const candidates: { id: string; score: number }[] = [];

  root.each((node) => {
    if (node.depth === 0 || node.depth > 3) {
      return;
    }
    const text = labelFor(node.data);
    if (!text || isNoiseTaxon(text)) {
      return;
    }
    // Always keep the major shallow clades (domains / kingdoms).
    if (node.depth <= 1) {
      labelled.add(node.data.nodeId);
      return;
    }
    candidates.push({ id: node.data.nodeId, score: tipScore(node.data) });
  });

  candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, MAX_LABELS - labelled.size))
    .forEach((c) => labelled.add(c.id));

  return labelled;
}

// ---------------------------------------------------------------------------
// Fit the grown tree into the viewport (origin anchored at bottom-centre).
// ---------------------------------------------------------------------------

function toSvg(p: Vec): Vec2 {
  return [p.x, -p.y];
}

function fromSvg(p: Vec2): Vec {
  return { x: p[0], y: -p[1] };
}

/** Place only unpinned nodes relative to their (already placed) parent. */
function placeUnpinnedFromParents(
  node: HierarchyNode<TreeNode>,
  meta: Map<string, Meta>,
  pinned: Set<string>,
  siblingIndex = 0
): void {
  const m = meta.get(node.data.nodeId)!;
  if (!pinned.has(node.data.nodeId) && node.parent) {
    const parentMeta = meta.get(node.parent.data.nodeId)!;
    // Screen-space length — pinned coords are already fitted to the viewport.
    const stagger = 1 + ((siblingIndex % 3) - 1) * 0.2;
    const len =
      Math.max(48, Math.min(110, 44 + Math.log2(m.tips + 1) * 14)) * stagger;
    const d = dir(m.angle);
    m.pos = {
      x: parentMeta.pos.x + d.x * len,
      y: parentMeta.pos.y + d.y * len,
    };
  }

  (node.children ?? []).forEach((child, index) => {
    placeUnpinnedFromParents(child, meta, pinned, index);
  });
}

export function computePosterLayout(
  tree: TreeNode,
  viewport: ViewportSize,
  previous?: LayoutResult | null
): LayoutResult {
  // Usable poster frame (padding so tips / stroke don't kiss the clip edge).
  const topPad = viewport.height * 0.05;
  const bottomPad = viewport.height * 0.05;
  const mapW = Math.max(1, viewport.width * 0.94);
  const mapH = Math.max(1, viewport.height - topPad - bottomPad);
  // Remap pinned geometry into the new frame. Uniform min() left empty bands on
  // tall viewports; per-axis fill stays inside mapW×mapH which is the space
  // *above* the bottom-anchored origin (see rootOffsetY in the stage).
  const viewportScaleX = previous ? mapW / Math.max(previous.width, 1) : 1;
  const viewportScaleY = previous ? mapH / Math.max(previous.height, 1) : 1;
  const pinScale = Math.min(viewportScaleX, viewportScaleY);

  const prefer = previous
    ? new Set(previous.nodes.map((n) => n.id))
    : undefined;

  // Kid counts from the full tree — poster prune must not hide expandability.
  const loadedKidCount = new Map<string, number>();
  const countLoadedKids = (node: TreeNode) => {
    const kids = kidsOf(node);
    loadedKidCount.set(node.nodeId, kids?.length ?? 0);
    kids?.forEach(countLoadedKids);
  };
  countLoadedKids(tree);

  const raw = hierarchy(
    pruneForPoster(tree, prefer),
    (d) => d.children ?? undefined
  );
  const keep = capTips(raw, prefer);
  // Also keep any previously visible internal nodes' descendant tips already covered;
  // prefer set ensures prior leaves survive.
  const filtered = filterToKeptTips(raw, keep);
  if (!filtered) {
    return { nodes: [], branches: [], width: mapW, height: mapH };
  }

  const root = hierarchy(filtered, (d) => d.children ?? undefined);

  // Stage 0 — weights.
  const meta = new Map<string, Meta>();
  annotate(root, meta);

  // Stage 2 — sectors across the canopy.
  const half = (CANOPY_SPAN_DEG * DEG) / 2;
  allocateSectors(root, -half, half, meta);

  const pinned = new Map<
    string,
    {
      pos: Vec;
      angle: number;
      color: string;
      markerRadius: number;
    }
  >();
  const pinnedBranches = new Map<
    string,
    {
      color: string;
      startColor: string;
      endColor: string;
      startWidth: number;
      endWidth: number;
    }
  >();
  previous?.nodes.forEach((n) => {
    const pos = fromSvg(n.position);
    pinned.set(n.id, {
      pos: { x: pos.x * viewportScaleX, y: pos.y * viewportScaleY },
      angle: n.angle,
      color: n.color,
      // Radii / stroke widths follow the smaller axis so markers stay round.
      markerRadius: n.markerRadius * pinScale,
    });
  });
  previous?.branches.forEach((b) => {
    pinnedBranches.set(b.id, {
      color: b.color,
      startColor: b.startColor,
      endColor: b.endColor,
      startWidth: b.startWidth * pinScale,
      endWidth: b.endWidth * pinScale,
    });
  });

  if (pinned.size > 0) {
    // Append mode: keep existing node positions, grow only new nodes from parents.
    root.each((node) => {
      const m = meta.get(node.data.nodeId)!;
      const pin = pinned.get(node.data.nodeId);
      if (pin) {
        m.pos = pin.pos;
        m.angle = pin.angle;
        m.sectorStart = pin.angle;
        m.sectorEnd = pin.angle;
      }
    });

    // Re-allocate sectors only under nodes that gained new children, using a
    // local fan around the parent's pinned angle.
    root.each((node) => {
      const children = node.children ?? [];
      if (!children.length) {
        return;
      }
      const hasNew = children.some((c) => !pinned.has(c.data.nodeId));
      if (!hasNew) {
        return;
      }
      const parentPin = pinned.get(node.data.nodeId);
      const parentMeta = meta.get(node.data.nodeId)!;
      const center = parentPin?.angle ?? parentMeta.angle;
      const newCount = children.filter(
        (c) => !pinned.has(c.data.nodeId)
      ).length;
      const span = Math.min(
        110 * DEG,
        Math.max(28 * DEG, (36 + newCount * 12) * DEG)
      );
      const total = children.reduce(
        (sum, child) => sum + meta.get(child.data.nodeId)!.tips,
        0
      );
      let cursor = center - span / 2;
      children.forEach((child) => {
        const cm = meta.get(child.data.nodeId)!;
        const childSpan = span * (cm.tips / total);
        if (!pinned.has(child.data.nodeId)) {
          cm.sectorStart = cursor;
          cm.sectorEnd = cursor + childSpan;
          cm.angle = cursor + childSpan / 2;
        }
        cursor += childSpan;
      });
    });

    placeUnpinnedFromParents(root, meta, new Set(pinned.keys()));
  } else {
    // Fresh layout — grow trunk then canopy, then fit to viewport.
    const rootMeta = meta.get(root.data.nodeId)!;
    rootMeta.pos = { x: 0, y: 0 };
    const trunkTop: Vec = { x: 0, y: TRUNK_HEIGHT };
    (root.children ?? []).forEach((child, index) => {
      const cm = meta.get(child.data.nodeId)!;
      const len = branchLength(cm.tips, 1, index);
      const d = dir(cm.angle);
      layoutNode(
        child,
        { x: trunkTop.x + d.x * len, y: trunkTop.y + d.y * len },
        meta
      );
    });

    separateTips(root, meta);

    let maxAbsX = 1;
    let maxY = 1;
    meta.forEach((m) => {
      maxAbsX = Math.max(maxAbsX, Math.abs(m.pos.x));
      maxY = Math.max(maxY, m.pos.y);
    });
    // Fit each axis independently so portrait (H>W) uses the extra height
    // instead of width-capping into a small floating canopy.
    const scaleX = (mapW / 2 / maxAbsX) * 0.92;
    const scaleY = (mapH / maxY) * 0.92;
    meta.forEach((m) => {
      m.pos = { x: m.pos.x * scaleX, y: m.pos.y * scaleY };
    });
  }

  const labelled = pickLabels(root);
  const colorById = new Map<string, string>();

  // Growth depth: distance below the nearest settled (pinned) ancestor.
  const growthDepthOf = (node: HierarchyNode<TreeNode>): number => {
    if (pinned.has(node.data.nodeId)) {
      return 0;
    }
    let depth = 0;
    let current: HierarchyNode<TreeNode> | null = node;
    while (current) {
      if (pinned.has(current.data.nodeId) || current.depth === 0) {
        return depth;
      }
      depth += 1;
      current = current.parent;
    }
    return node.depth;
  };

  const nodes: LayoutNode[] = [];
  const branches: LayoutBranch[] = [];
  // Width available at each node for outgoing edges = end width of the
  // incoming branch (origin uses a synthetic stem width).
  const widthAtNode = new Map<string, number>();
  const rootTips = root.data.numTips ?? meta.get(root.data.nodeId)!.tips;
  widthAtNode.set(root.data.nodeId, stemStartWidth(rootTips));

  root.each((node) => {
    const m = meta.get(node.data.nodeId)!;
    const isTip = !node.children?.length;
    const isOrigin = node.depth === 0 && isAbsoluteOrigin(node.data);
    const loadedKids = loadedKidCount.get(node.data.nodeId) ?? 0;
    // Poster prune may hide kids — use full-tree counts, then OTOL tip signal.
    const expandable =
      !isOrigin && loadedKids === 0 && hasUnresolvedChildren(node.data);

    const pin = pinned.get(node.data.nodeId);
    // Animate newly placed nodes — including the first paint from root.
    const isNew = !pin;
    let color: string;
    if (pin) {
      color = pin.color;
    } else if (isOrigin) {
      color = '#0dae6b'; // --kicl-color-green / $green
    } else {
      const parentColor = node.parent
        ? colorById.get(node.parent.data.nodeId)
        : undefined;
      const base = parentColor ?? resolveColor(node);
      color = spectrumVariant(base, node.data.nodeId);
    }
    colorById.set(node.data.nodeId, color);

    const svgPos = toSvg(m.pos);

    // Resolve incoming ribbon width before sizing the marker so the node
    // always covers the joint (internal markers used to sit under the stroke).
    let branchStartWidth = MIN_BRANCH_WIDTH;
    let branchEndWidth = MIN_BRANCH_WIDTH;
    let branchPin:
      | {
          color: string;
          startColor: string;
          endColor: string;
          startWidth: number;
          endWidth: number;
        }
      | undefined;
    if (node.parent) {
      const branchId = `${node.parent.data.nodeId}->${node.data.nodeId}`;
      branchPin = pinnedBranches.get(branchId);
      // Leaf branches: start at 2× min and taper to the floor.
      // Forks: inherit parent tip width and keep a proportional taper.
      if (isTip) {
        branchStartWidth = branchPin?.startWidth ?? MIN_BRANCH_WIDTH * 2;
        branchEndWidth = branchPin?.endWidth ?? MIN_BRANCH_WIDTH;
      } else {
        branchStartWidth =
          branchPin?.startWidth ??
          widthAtNode.get(node.parent.data.nodeId) ??
          MIN_BRANCH_WIDTH;
        branchEndWidth = branchPin?.endWidth ?? taperEndWidth(branchStartWidth);
      }
      widthAtNode.set(node.data.nodeId, branchEndWidth);
    }
    const jointWidth = node.parent
      ? branchEndWidth
      : (widthAtNode.get(node.data.nodeId) ?? MIN_BRANCH_WIDTH);

    const baseRadius = isOrigin ? 5 : markerRadiusFor(node, isTip);
    const computedRadius = markerRadiusForJoint(baseRadius, jointWidth);
    // Never shrink a pinned marker, but do grow it if the joint is wider.
    const markerRadius = pin
      ? Math.max(pin.markerRadius, computedRadius)
      : computedRadius;

    const d = dir(m.angle);
    // Pedicels only on tips (no descendants) — fruit on a stalk, not at forks.
    const pedicelLen =
      isOrigin || !isTip || !node.parent
        ? 0
        : pedicelLengthFor(markerRadius, jointWidth);
    const pedicelWidth =
      pedicelLen > 0 ? pedicelWidthFor(markerRadius, jointWidth) : 0;
    const pedicelInset =
      pedicelLen > 0 ? pedicelInsetFor(markerRadius, jointWidth) : 0;

    let markerPosition = svgPos;
    let pedicelPath = '';
    let pedicelAttach: Vec2 | null = null;
    let markerLayout = m.pos;

    if (pedicelLen > 0 && node.parent) {
      const parentMeta = meta.get(node.parent.data.nodeId)!;
      const parentSvg = toSvg(parentMeta.pos);
      const incomingCurve = branchCurve(parentSvg, svgPos);
      const attachSvg = pedicelAttachOnCurve(incomingCurve, pedicelInset);
      const hung = hangPedicel(
        attachSvg,
        m.angle,
        pedicelLen,
        node.data.nodeId
      );
      markerPosition = hung.markerSvg;
      pedicelPath = hung.path;
      pedicelAttach = attachSvg;
      markerLayout = fromSvg(hung.markerSvg);
    }

    const labelPos: Vec2 = isTip
      ? toSvg({
          x: markerLayout.x + d.x * ILLUSTRATION_OFFSET * 0.35,
          y: markerLayout.y - ILLUSTRATION_OFFSET,
        })
      : [markerPosition[0], markerPosition[1] - 6];

    const growthDepth = isNew
      ? pinned.size > 0
        ? growthDepthOf(node)
        : node.depth
      : 0;

    nodes.push({
      id: node.data.nodeId,
      node: node.data,
      position: svgPos,
      markerPosition,
      pedicelPath,
      pedicelAttach,
      pedicelInset,
      pedicelLength: pedicelLen,
      pedicelWidth,
      angle: m.angle,
      depth: node.depth,
      growthDepth,
      color,
      expandable,
      showLabel: !isOrigin && labelled.has(node.data.nodeId),
      labelPosition: labelPos,
      fontSize: node.depth <= 1 ? 9.5 : 7.5,
      isOrigin,
      isTip,
      markerRadius,
      isNew,
      parentId: node.parent?.data.nodeId ?? null,
    });

    if (!node.parent) {
      return;
    }
    const parentMeta = meta.get(node.parent.data.nodeId)!;
    const parentSvg = toSvg(parentMeta.pos);
    const branchId = `${node.parent.data.nodeId}->${node.data.nodeId}`;
    const curve = branchCurve(parentSvg, svgPos);
    const parentColor = colorById.get(node.parent.data.nodeId) ?? color;
    const startColor = branchPin?.startColor ?? parentColor;
    const endColor = branchPin?.endColor ?? color;
    branches.push({
      id: branchId,
      parentId: node.parent.data.nodeId,
      childId: node.data.nodeId,
      path: branchPath(curve),
      curve,
      ribbonPath: taperedRibbonPath(curve, branchStartWidth, branchEndWidth),
      startColor,
      endColor,
      color: endColor,
      startWidth: branchStartWidth,
      endWidth: branchEndWidth,
      strokeWidth: branchStartWidth,
      growthDepth,
      depth: node.depth,
      isNew,
    });
  });

  // Draw thick trunks first so thin twigs layer on top.
  branches.sort((a, b) => b.strokeWidth - a.strokeWidth);

  return { nodes, branches, width: mapW, height: mapH };
}

export { HEIGHT_LIMIT_DEFAULT };

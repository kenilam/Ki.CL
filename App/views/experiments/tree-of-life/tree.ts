export type TreeAsset = {
  id: string;
  url: string;
  generator?: string | null;
};

export type TreeVisualScore = {
  overall: number;
  taxonMatch: number;
  pass: boolean;
};

export type TreeNode = {
  nodeId: string;
  ottId?: number | null;
  name?: string | null;
  rank?: string | null;
  /**
   * OTOL tip count tipward of this node. `0` = true leaf (never expand).
   * Keep `null` when unknown - do not invent a loaded-subtree count of `1`.
   */
  numTips?: number | null;
  assetId?: string | null;
  asset?: TreeAsset | null;
  description?: string | null;
  visualStatus?: string | null;
  visualScore?: TreeVisualScore | null;
  /** Immediate children - GraphQL field `descendants` (DataLoader-stitched). */
  descendants?: TreeNode[] | null;
  /** @deprecated Alias of `descendants` for older experiment layouts. */
  children?: TreeNode[] | null;
};

/** Cellular organisms - Open Tree of Life synthetic root. */
export const ROOT_OTT_ID = 93302;

export const DEFAULT_HEIGHT_LIMIT = 3;

/**
 * Poster-inspired lineage colors (vertebrates red, arthropods blue,
 * plants green, fungi/basal orange, microbes near-root dark).
 */
export const POSTER_PALETTE = [
  '#c1121f', // vertebrates / mammals
  '#e85d04', // reptiles / basal animals
  '#0077b6', // arthropods
  '#00b4d8', // insects / crustacea
  '#7b2cbf', // molluscs / worms
  '#f4a261', // echinoderms / cnidaria
  '#2a9d8f', // plants
  '#40916c', // green plants / algae
  '#bc6c25', // fungi
  '#1b4332', // bacteria
  '#52796f', // archaea
  '#6d597a', // other
] as const;

const NAMED_CLADE_COLORS: Record<string, string> = {
  bacteria: '#1b4332',
  archaea: '#52796f',
  eukaryota: '#6d597a',
  opisthokonta: '#bc6c25',
  fungi: '#bc6c25',
  metazoa: '#c1121f',
  animalia: '#c1121f',
  porifera: '#f4a261',
  cnidaria: '#f4a261',
  echinodermata: '#e85d04',
  arthropoda: '#0077b6',
  insecta: '#00b4d8',
  crustacea: '#0096c7',
  mollusca: '#7b2cbf',
  annelida: '#9b5de5',
  chordata: '#c1121f',
  vertebrata: '#c1121f',
  mammalia: '#9b2226',
  aves: '#d62828',
  reptilia: '#e85d04',
  amphibia: '#f77f00',
  actinopterygii: '#e76f51',
  viridiplantae: '#2a9d8f',
  chloroplastida: '#2a9d8f',
  plantae: '#40916c',
  embryophyta: '#40916c',
  streptophyta: '#52b788',
};

export function kidsOf(node: TreeNode): TreeNode[] | null {
  return node.descendants ?? node.children ?? null;
}

/** OTOL tip marker - e.g. rank string "no rank - terminal". */
export function isTerminalRank(rank?: string | null): boolean {
  return /\bterminal\b/i.test(rank?.trim() ?? '');
}

/**
 * Whether this tip still needs an OTOL probe for children.
 * Known leaves (`numTips === 0`) and terminal ranks stay closed.
 * `null` tip count still probes once (height cutoffs / incomplete Mongo).
 */
export function hasUnresolvedChildren(node: TreeNode): boolean {
  if (kidsOf(node)?.length) {
    return false;
  }
  if (isTerminalRank(node.rank)) {
    return false;
  }
  // OTOL leaves are 0. Do not coerce null→0 here - that stalled Grow when
  // tip counts were missing. Empty probes write 0 via mergeSubtree.
  return node.numTips !== 0;
}

/**
 * Tips in the loaded tree that still need an OTOL probe.
 * Skips known leaves and nodes that already have children.
 */
export type ExpandableTip = {
  node: TreeNode;
  parentId: string | null;
};

export function collectExpandableTips(
  node: TreeNode,
  out: ExpandableTip[] = [],
  parentId: string | null = null
): ExpandableTip[] {
  const kids = kidsOf(node);
  if (!kids?.length) {
    if (
      hasUnresolvedChildren(node) &&
      (node.ottId != null || Boolean(node.nodeId))
    ) {
      out.push({ node, parentId });
    }
    return out;
  }
  kids.forEach((child) => {
    collectExpandableTips(child, out, node.nodeId);
  });
  return out;
}

/** SILVA / environmental noise - not worth auto-growing into. */
export function isNoiseTaxon(name: string | null | undefined): boolean {
  if (!name) {
    return true;
  }
  return /silva|uncultured|sp\.\s|candidatus|environmental|metagenome/i.test(
    name
  );
}

/**
 * Major named clades we want Grow to open before microbial leaf soup.
 * Matched against the start of `name` (case-insensitive).
 */
const PRIORITY_CLADE =
  /^(metazoa|animalia|opisthokonta|chordata|vertebrata|arthropoda|mammalia|aves|insecta|mollusca|cnidaria|porifera|echinodermata|annelida|nematoda|fungi|ascomycota|basidiomycota|viridiplantae|chloroplastida|embryophyta|streptophyta|plantae|magnoliophyta|tracheophyta|bryophyta|rhodophyta|eukaryota)\b/i;

/**
 * Score an expandable tip for auto-grow. High `numTips` + priority clade names
 * win; Candidatus / SILVA species tips lose so Grow reaches animals & plants.
 */
export function expandPriority(node: TreeNode): number {
  const tips = node.numTips;
  let score = 0;

  if (typeof tips === 'number') {
    // log10(1)=0 … log10(1e6)≈6 → up to ~240
    score += Math.log10(tips + 1) * 40;
  } else {
    // Unknown tip count - probe, but below any large named clade.
    score += 8;
  }

  const name = node.name?.trim() ?? '';
  if (PRIORITY_CLADE.test(name)) {
    score += 120;
  } else if (name && !isNoiseTaxon(name)) {
    score += 18;
  }

  if (isNoiseTaxon(name)) {
    score -= 140;
  }

  const rank = node.rank?.toLowerCase() ?? '';
  if (
    (rank === 'species' ||
      rank === 'subspecies' ||
      rank.includes('terminal')) &&
    (typeof tips !== 'number' || tips <= 1)
  ) {
    score -= 60;
  }

  // Prefer higher ranks when tip counts are similar.
  if (/domain|kingdom|phylum|class|order/.test(rank)) {
    score += 25;
  }

  return score;
}

/**
 * Pick a batch of expandable tips: highest expandPriority first, capped per
 * parent so one bacterial sibling cloud cannot fill the whole request.
 */
export function pickExpandBatch(
  expandable: readonly ExpandableTip[],
  limit: number,
  maxPerParent = 3
): ExpandableTip[] {
  const ranked = [...expandable].sort(
    (a, b) =>
      expandPriority(b.node) - expandPriority(a.node) ||
      (b.node.numTips ?? 0) - (a.node.numTips ?? 0) ||
      a.node.nodeId.localeCompare(b.node.nodeId)
  );

  const perParent = new Map<string, number>();
  const batch: ExpandableTip[] = [];

  for (const tip of ranked) {
    const key = tip.parentId ?? tip.node.nodeId;
    const used = perParent.get(key) ?? 0;
    if (used >= maxPerParent) {
      continue;
    }
    batch.push(tip);
    perParent.set(key, used + 1);
    if (batch.length >= limit) {
      break;
    }
  }

  return batch;
}

function countTips(node: TreeNode): number {
  const kids = kidsOf(node);
  if (!kids?.length) {
    return 1;
  }
  return kids.reduce((sum, child) => sum + countTips(child), 0);
}

type SubtreeNodeInput = {
  nodeId: string;
  ottId?: number | null;
  name?: string | null;
  rank?: string | null;
  numTips?: number | null;
  assetId?: string | null;
  asset?: TreeAsset | null;
  description?: string | null;
  visualStatus?: string | null;
  visualScore?: TreeVisualScore | null;
  descendants?: readonly SubtreeNodeInput[] | null;
  children?: readonly SubtreeNodeInput[] | null;
};

/** Map a GraphQL TreeOfLifeNode (descendants) into layout TreeNode. */
export function fromSubtreeNode(node: SubtreeNodeInput): TreeNode {
  const rawKids = node.descendants ?? node.children ?? null;
  const descendants = rawKids?.length
    ? rawKids.map((child) => fromSubtreeNode(child))
    : null;
  const normalized: TreeNode = {
    nodeId: node.nodeId,
    ottId: node.ottId,
    name: node.name,
    rank: node.rank,
    assetId: node.assetId,
    asset: node.asset
      ? {
          id: node.asset.id,
          url: node.asset.url,
          generator: node.asset.generator,
        }
      : null,
    description: node.description,
    visualStatus: node.visualStatus,
    visualScore: node.visualScore
      ? {
          overall: node.visualScore.overall,
          taxonMatch: node.visualScore.taxonMatch,
          pass: node.visualScore.pass,
        }
      : null,
    descendants,
    children: descendants,
  };
  // Keep OTOL’s tip count. Never invent `1` via countTips for empty nodes -
  // that mislabels species leaves as expandable.
  if (typeof node.numTips === 'number') {
    normalized.numTips = node.numTips;
  } else if (descendants?.length) {
    normalized.numTips = countTips(normalized);
  } else {
    normalized.numTips = null;
  }
  return normalized;
}

/** Merge kids by nodeId - keep existing, append new, recurse into matches. */
function mergeKids(
  existing: TreeNode[] | null | undefined,
  incoming: TreeNode[] | null | undefined
): TreeNode[] | null {
  if (!incoming?.length) {
    return existing ?? null;
  }
  if (!existing?.length) {
    return incoming;
  }

  const seen = new Set(existing.map((child) => child.nodeId));
  const merged = existing.map((child) => {
    const next = incoming.find(
      (candidate) => candidate.nodeId === child.nodeId
    );
    return next ? mergeSubtree(child, next) : child;
  });

  incoming.forEach((child) => {
    if (!seen.has(child.nodeId)) {
      merged.push(child);
    }
  });

  return merged;
}

export function mergeSubtree(root: TreeNode, subtree: TreeNode): TreeNode {
  if (root.nodeId === subtree.nodeId) {
    const descendants = mergeKids(kidsOf(root), kidsOf(subtree));
    const merged: TreeNode = {
      ...root,
      name: subtree.name ?? root.name,
      rank: subtree.rank ?? root.rank,
      ottId: subtree.ottId ?? root.ottId,
      assetId: subtree.assetId ?? root.assetId,
      asset: subtree.asset ?? root.asset,
      description: subtree.description ?? root.description,
      visualStatus: subtree.visualStatus ?? root.visualStatus,
      visualScore:
        subtree.visualScore !== undefined
          ? subtree.visualScore
          : root.visualScore,
      descendants,
      children: descendants,
    };
    if (typeof subtree.numTips === 'number') {
      merged.numTips = subtree.numTips;
    } else if (typeof root.numTips === 'number') {
      merged.numTips = root.numTips;
    } else if (descendants?.length) {
      merged.numTips = countTips(merged);
    } else {
      // Empty probe with no tip count - close the node so Grow won't re-fetch.
      merged.numTips = 0;
    }
    return merged;
  }

  const rootKids = kidsOf(root);
  if (!rootKids?.length) {
    return root;
  }

  const descendants = rootKids.map((child) => mergeSubtree(child, subtree));
  return {
    ...root,
    descendants,
    children: descendants,
  };
}

export function labelFor(node: TreeNode): string {
  const name = node.name?.trim();
  if (!name) {
    return '';
  }

  return name.replace(/\s*\([^)]*silva[^)]*\)\s*/gi, '').trim();
}

/** Human-readable rank, empty when missing / no rank (incl. "no rank - terminal"). */
export function displayRank(rank?: string | null): string {
  const value = rank?.trim() ?? '';
  if (!value || /^no[\s_-]?rank\b/i.test(value)) {
    return '';
  }
  return value;
}

export function labelWithRank(node: TreeNode, isOrigin = false): string {
  const name = isOrigin ? 'Origin of life' : labelFor(node);
  const rank = displayRank(node.rank);
  if (!name) {
    return rank;
  }
  if (!rank) {
    return name;
  }
  return `${name} · ${rank}`;
}

export type RankShape =
  'circle' | 'ring' | 'double-ring' | 'diamond' | 'square' | 'outline';

export type RankVisual = {
  shape: RankShape;
  /** Multiplier on the layout marker radius. */
  scale: number;
};

function normalizeRank(rank?: string | null): string {
  return (rank ?? '').trim().toLowerCase().replace(/[_-]+/g, ' ');
}

/** Map OTT taxonomic rank → marker shape / weight for quick scanning. */
export function rankVisual(rank?: string | null): RankVisual {
  const r = normalizeRank(rank);
  if (!r || r.startsWith('no rank') || r === 'clade') {
    return { shape: 'circle', scale: 1 };
  }
  if (/(^|\s)(domain|superkingdom|kingdom)(\s|$)/.test(r)) {
    return { shape: 'double-ring', scale: 1.45 };
  }
  if (/(^|\s)(phylum|division)(\s|$)/.test(r)) {
    return { shape: 'ring', scale: 1.3 };
  }
  if (/(^|\s)(class|subclass|superclass)(\s|$)/.test(r)) {
    return { shape: 'diamond', scale: 1.18 };
  }
  if (/(^|\s)(order|suborder|infraorder|superorder)(\s|$)/.test(r)) {
    return { shape: 'square', scale: 1.1 };
  }
  if (/(^|\s)(family|subfamily|tribe|superfamily)(\s|$)/.test(r)) {
    return { shape: 'outline', scale: 1.05 };
  }
  if (/(^|\s)(genus|subgenus)(\s|$)/.test(r)) {
    return { shape: 'circle', scale: 1 };
  }
  if (/(^|\s)(species|subspecies|variety|form|strain)(\s|$)/.test(r)) {
    return { shape: 'circle', scale: 0.82 };
  }
  return { shape: 'circle', scale: 1 };
}

export function colorForName(name: string | null | undefined): string | null {
  if (!name) {
    return null;
  }

  const key = name.toLowerCase().split(/\s+/)[0] ?? '';
  return NAMED_CLADE_COLORS[key] ?? null;
}

export function paletteColor(index: number): string {
  return POSTER_PALETTE[Math.abs(index) % POSTER_PALETTE.length];
}

/** @deprecated Prefer `paletteColor` / `colorForName` - kept for v1. */
export const CLADE_COLORS = POSTER_PALETTE;

/** @deprecated Prefer `colorForName` - kept for v1. */
export function colorForCladeName(
  name: string | null | undefined,
  fallbackIndex: number
): string {
  return colorForName(name) ?? paletteColor(fallbackIndex);
}

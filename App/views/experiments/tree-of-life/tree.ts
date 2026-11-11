export type TreeNode = {
  nodeId: string;
  ottId?: number | null;
  name?: string | null;
  rank?: string | null;
  /** OTOL tip count tipward of this node. `0` is a true leaf. */
  numTips?: number | null;
  assetId?: string | null;
  asset?: {
    id: string;
    url: string;
    generator?: string | null;
  } | null;
  description?: string | null;
  visualStatus?: string | null;
  visualScore?: {
    overall: number;
    taxonMatch: number;
    pass: boolean;
  } | null;
  /** Immediate children - GraphQL field `descendants`. */
  descendants?: TreeNode[] | null;
};

/** Cellular organisms - Open Tree of Life synthetic root. */
export const ROOT_OTT_ID = 93302;

/** OTOL tip marker - e.g. rank string "no rank - terminal". */
export function isTerminalRank(rank?: string | null): boolean {
  return /\bterminal\b/i.test(rank?.trim() ?? '');
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

/** `origin` is the origin's name, passed when the node is the origin. */
export function labelWithRank(node: TreeNode, origin?: string): string {
  const name = origin ?? labelFor(node);
  const rank = displayRank(node.rank);

  if (!name) {
    return rank;
  }

  if (!rank) {
    return name;
  }

  return `${name} · ${rank}`;
}

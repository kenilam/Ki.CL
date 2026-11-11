// Tree
import { labelFor, type TreeNode } from '@/views/experiments/tree-of-life/tree';

export const CLASS_NAME =
  'kicl--views--experiments--tree-of-life--taxon-visual';

export const DEBOUNCE_MS = 500;

/** The origin, and a taxon with no Open Tree id or name, get no plate. */
export function isTaxonVisualEligible(
  node: TreeNode,
  isOrigin = false
): boolean {
  if (isOrigin) {
    return false;
  }

  if (node.ottId == null || node.ottId < 1) {
    return false;
  }

  return Boolean(labelFor(node));
}

/**
 * Which `error` phrase a failure reads. Exhaustion is the one failure a reload
 * cannot clear, so it has its own.
 */
export function messageKey({
  error,
  status,
}: {
  error: boolean;
  status?: string | null;
}): 'unreachable' | 'exhausted' | 'unfinished' {
  if (error) {
    return 'unreachable';
  }

  if (status === 'EXHAUSTED') {
    return 'exhausted';
  }

  return 'unfinished';
}

/** Which `plate` phrase the live region reads out. */
export function announcementFor({
  imageUrl,
  isGenerating,
}: {
  imageUrl: string | null;
  isGenerating: boolean;
}): 'drawing' | 'ready' | 'none' {
  if (isGenerating) {
    return 'drawing';
  }

  return imageUrl ? 'ready' : 'none';
}

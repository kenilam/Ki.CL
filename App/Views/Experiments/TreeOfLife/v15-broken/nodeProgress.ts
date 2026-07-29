/**
 * Live growth accessors, keyed by nodeId.
 *
 * Progress is owned by each recursive Node instance, but the label layer is a
 * single screen-space pass that needs every node's value at once. Rather than
 * lift the timing back into a central scheduler — the thing the rewrite got
 * rid of — nodes publish a read-only accessor here and the label layer reads
 * it. Registration is per-frame-free: it happens on mount and is cleaned up
 * on unmount.
 */

const registry = new Map<string, () => number>();

export function registerNodeProgress(
  key: string,
  read: () => number
): () => void {
  registry.set(key, read);
  return () => {
    // Only clear if we still own the slot; a re-registration may have
    // replaced it while this cleanup was pending.
    if (registry.get(key) === read) {
      registry.delete(key);
    }
  };
}

/** 0 when the node is not mounted, so a label can never outlive its node. */
export function readNodeProgress(key: string): number {
  return registry.get(key)?.() ?? 0;
}

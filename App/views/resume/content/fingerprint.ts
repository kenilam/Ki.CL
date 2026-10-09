import type { Version } from './types';

/**
 * A short hash of one version's content: FNV-1a over its JSON. It only has to
 * change when the content does, so the page can tell whether the exported PDF
 * was made from what it is showing. It protects nothing.
 */
const fingerprint = (version: Version): string => {
  const text = JSON.stringify(version);

  let hash = 0x811c9dc5;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, '0');
};

export { fingerprint };

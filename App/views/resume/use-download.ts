import { MASTER, fingerprint } from './content';
import EXPORTED from './exported.json';
import { useResolvedVersion } from './use-resolved-version';

const CONTEXTS = {
  true: 'download',
  false: 'download_english',
} as const;

const useDownload = () => {
  const master = useResolvedVersion(MASTER.slug);

  if (!master) {
    return null;
  }

  return CONTEXTS[String(EXPORTED.fingerprint === fingerprint(master))];
};

export { useDownload };

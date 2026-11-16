import { MASTER, fingerprint } from './content';
import { useVersion } from './context';
import EXPORTED from './exported.json';

const CONTEXTS = {
  true: 'download',
  false: 'download_english',
} as const;

const useDownload = () => {
  const version = useVersion();

  if (version.slug !== MASTER.slug) {
    return null;
  }

  return CONTEXTS[String(EXPORTED.fingerprint === fingerprint(version))];
};

export { useDownload };

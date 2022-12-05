import fs from 'fs';
import glob from 'glob';
import path from 'path';

import { path as appRoot } from 'app-root-path';

import plugin from '@originjs/vite-plugin-federation';

const ROOT = `${appRoot}/App/`;

type Remotes = Exclude<Parameters<typeof plugin>[number]['remotes'], undefined>;

const getRemotes = (pattern: Parameters<typeof glob.sync>[0]) => {
  const files = glob.sync(pattern);

  const result: Remotes = {};

  files.forEach(async (file) => {
    const name = path.dirname(file).replace(ROOT, '');

    if (!name) {
      return;
    }

    const buffer = fs.readFileSync(file);

    const config = JSON.parse(`${buffer}`);

    const { remoteEntry } = config;

    if (!remoteEntry) {
      return;
    }

    result[name] = {
      external: `Promise.resolve(\`${remoteEntry}\`)`,
      externalType: 'promise',
    };
  });

  return result;
};

export type { Remotes };
export default getRemotes;

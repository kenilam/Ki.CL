import appRoot from 'app-root-path';
import * as nodePath from 'path';

import * as dotenv from 'dotenv';

import { AliasOptions } from 'vite';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * Paths are resolved relative to App/tsconfig.json (TS 6+: no baseUrl).
 *
 * This helper must keep a relative import for tsconfig.json - it runs while
 * Vite aliases are being built, so `@/` is not available yet.
 *
 * Module Federation remotes (e.g. `api/*` → `@mf-types/api/*`) stay in
 * tsconfig for typechecking only - they must not become Vite resolve
 * aliases or they would shadow the federated runtime remote.
 */
import tsconfig from '../../tsconfig.json';

const TSCONFIG_DIR = nodePath.join(appRoot.path, 'App');

const isFederatedTypesTarget = (absolutePath: string) => {
  const normalized = absolutePath.replace(/\\/g, '/');
  return normalized.includes('/@mf-types/');
};

const getAlias = (config: typeof tsconfig) => {
  const alias: AliasOptions = {};

  const { paths } = config.compilerOptions;

  Object.keys(paths).forEach((name) => {
    const find = name.replace(/\/\*$/, '');

    const replacement = paths[name]
      .map((pathPattern) => {
        const relative =
          pathPattern.replace(/\/\*$/, '').replace(/\*$/, '') || '.';
        return nodePath.resolve(TSCONFIG_DIR, relative);
      })
      .join(',');

    if (replacement.split(',').some(isFederatedTypesTarget)) {
      return;
    }

    alias[find] = replacement;
  });

  return alias;
};

export default getAlias;

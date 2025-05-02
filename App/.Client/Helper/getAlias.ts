import appRoot from 'app-root-path';

import * as dotenv from 'dotenv';

import { AliasOptions } from 'vite';

dotenv.config({ path: `${appRoot.path}/.env` });

/**
 * I have to do relative path because tsconfig seem not able to picking up this directory
 */
import tsconfig from '../../tsconfig.json';

const getAlias = (config: typeof tsconfig) => {
  const alias: AliasOptions = {};

  const { compilerOptions } = config;

  const { paths } = compilerOptions;

  Object.keys(compilerOptions.paths).forEach((name) => {
    const find = name.replace('/*', '');

    const replacement = paths[name]
      .map(
        (path) => `${appRoot.path}/${path.replace('/*', '').replace('*', '')}`
      )
      .join(',');

    alias[find] = replacement;
  });

  return alias;
};

export default getAlias;

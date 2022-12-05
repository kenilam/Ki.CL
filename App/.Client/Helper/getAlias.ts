import { path as appRoot } from 'app-root-path';

import { AliasOptions } from 'vite';

/**
 * I have to do relative path because tsconfig seem not able to picking up this directory
 */
import tsconfig from '../../tsconfig.json';

const getAlias = (config: typeof tsconfig) => {
  const alias: AliasOptions = {};

  const { compilerOptions } = config;

  type Paths = typeof compilerOptions.paths;

  const { paths } = compilerOptions;

  Object.keys(compilerOptions.paths).forEach((name) => {
    const find = name.replace('/*', '');

    const path = paths[name]
      .map((path) => `${appRoot}/${path.replace('/*', '').replace('*', '')}`)
      .join(',');

    alias[find] = path;
  });

  return alias;
};

export default getAlias;

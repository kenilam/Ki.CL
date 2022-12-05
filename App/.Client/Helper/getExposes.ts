import glob from 'glob';
import colors from 'colors/safe';

import { path as appRoot } from 'app-root-path';

import { VitePluginFederationOptions } from '@originjs/vite-plugin-federation';

/**
 * I have to do relative path because tsconfig seem not able to picking up this directory
 */
import configJSON from '../../app.config.json';

const GLOB = '{.js,.jsx,.ts,.tsx,/index{.js,.jsx,.ts,.tsx}}';
const NAME = ':federation:exposes';

type Props = {
  config?: typeof configJSON;
  root?: typeof appRoot;
};

const DEFAULT = {
  config: configJSON,
  root: `${appRoot}/App`,
};

const getExposes = ({
  config = DEFAULT.config,
  root = appRoot,
}: Props = DEFAULT) => {
  const exposes: VitePluginFederationOptions['exposes'] = {};

  const succeed: { packageName: string; path: string }[] = [];
  const failed: string[] = [];

  const base = [root, config.name].join('/').replace(/\/\//g, '/');

  config.exposes?.forEach((packageName) => {
    const [path] = glob.sync(
      [base, `${packageName}${GLOB}`].join('/').replace(/\/\//g, '/')
    );

    if (!path) {
      failed.push(packageName);
      return;
    }

    succeed.push({ packageName, path });

    exposes[`./${packageName.replace('App/', '')}`] = path.replace(base, '.');
  });

  if (succeed.length || failed.length) {
    console.log(`  ${colors.bold(colors.cyan(`${config.name}${NAME}`))}`);
  }

  succeed.forEach(({ packageName, path }) => {
    console.log(
      `    ✅ ${colors.underline(
        colors.green(packageName)
      )} is configured to exposes from ${colors.underline(colors.green(path))}`
    );
  });

  failed.forEach((packageName) => {
    console.log(
      `    💀 Failed to resolve ${colors.underline(
        colors.red(packageName)
      )} origin.`
    );
  });

  if (failed.length) {
    throw new Error(
      `Please review your app.config.json, and make sure the module folder exist and contain a index file.`
    );
  }

  return exposes;
};

export default getExposes;

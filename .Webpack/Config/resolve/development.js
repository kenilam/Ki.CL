import { context, contextRoot } from '!/Config/entry';
import { path as appRoot } from 'app-root-path';
import fs from 'fs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const alias = {
  '^': appRoot,
  '$': contextRoot,
  '@': context,
};

const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.scss',
  '.css',
  '.json',
  '.xml',
  '.*',
  '.mjs'
];

const plugins = [
  new TsconfigPathsPlugin({
    configFile: `${appRoot}/tsconfig.json`,
    logLevel: 'info',
    extensions,
    mainFields: ['browser', 'main'],
  }),
];

alias['react-dom'] = '@hot-loader/react-dom';

const resolve = {
  mainFields: ['browser', 'main', 'module'],
  alias,
  extensions,
  modules: ['node_modules'],
  plugins,
  fallback: {
    domain: require.resolve("domain-browser"),
    stream: require.resolve("stream-browserify"),
    process: require.resolve("process")
  }
};

export default resolve;

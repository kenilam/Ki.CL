import StyleLintPlugin from 'stylelint-webpack-plugin';

import { path as appRoot } from 'app-root-path';
import glob from 'glob';

import { context, contextRoot } from '!/Config/entry';

const CSSloaders = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      config: { path: `${appRoot}/.postcssrc.js` },
    },
  },
];

const SCSSloaders = [].concat(CSSloaders, {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    includePaths: [`${appRoot}/node_modules`, contextRoot, context],
  },
});

const resources = [
  `${appRoot}/node_modules/sass-{*}/**/_*.scss`,
  `${contextRoot}/**/_*.scss`,
];

const hasInitialResources = resources.some(path => glob.sync(path).length > 0);

if (hasInitialResources) {
  SCSSloaders.push({
    loader: 'sass-resources-loader',
    options: { sourceMap: true, resources },
  });
}

const rules = [
  { test: /\.css$/, use: CSSloaders },
  { test: /\.scss$/, use: SCSSloaders },
];

const plugins = [
  new StyleLintPlugin({
    files: ['**/*.scss'],
    context: contextRoot,
    fix: true,
  }),
];

export { CSSloaders, SCSSloaders };
export default {
  module: { rules },
  plugins,
};

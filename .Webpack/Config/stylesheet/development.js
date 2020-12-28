import { context, contextRoot } from '!/Config/entry';
import { path as appRoot } from 'app-root-path';
import glob from 'glob';

import StylelintFormatter from 'stylelint-formatter-pretty';
import StyleLintPlugin from 'stylelint-webpack-plugin';

const style = {
  loader: 'style-loader',
};

const css = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    modules: {
      exportLocalsConvention: 'asIs',
      localIdentName: '[local]',
    },
    sourceMap: true,
  },
};


const postcss = {
  loader: 'postcss-loader'
};

const sass = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      includePaths: [contextRoot, context],
    },
    sourceMap: true,
  },
};

const resources = {
  loader: 'sass-resources-loader',
  options: {
    sourceMap: true,
    resources: [
      `${appRoot}/node_modules/sass-{*}/**/_*.scss`,
      `${contextRoot}/**/_*.scss`,
    ],
  },
};

const BasicLoaders = [ style, css ];
const CSSLoaders = [ ...BasicLoaders, postcss ];
const SCSSLoaders = [ ...BasicLoaders, postcss, sass ];

const rules = [
  {
    test: /\.css$/,
    use: CSSLoaders,
  },
  {
    test: /\.scss$/,
    use: SCSSLoaders,
  },
];

const plugins = [
  // new ExtractCssChunks({
  //   filename: '[name].[hash].css',
  //   chunkFilename: '[id].[hash].css',
  // }),
  new StyleLintPlugin({
    console: true,
    context: contextRoot,
    files: ['**/*.{css,scss}'],
    fix: true,
    formatter: StylelintFormatter,
    quiet: false,
  })
];

const hasInitialResources = resources.options.resources.some(
  (path) => glob.sync(path).length > 0
);

if (hasInitialResources) {
  SCSSLoaders.push(resources);
}

export { CSSLoaders, SCSSLoaders };
export default {
  module: {
    rules,
  },
  plugins,
};

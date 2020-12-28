import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { CSSLoaders, SCSSLoaders } from './development';

const fallback = 'style-loader';

const loaders = (rest) =>
  [].concat(
    fallback,
    rest
      .filter(({ loader }) => loader !== fallback)
      .map((loader) =>
        Object.assign(loader, {
          options: Object.assign(loader?.options || {}, { sourceMap: false }),
        })
      )
  );

const rules = [
  {
    test: /\.css$/,
    use: loaders(CSSLoaders),
  },
  {
    test: /\.scss$/,
    use: loaders(SCSSLoaders),
  },
];



const plugins = [
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.optimize\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  })
];

export default {
  module: {
    rules,
  },
  plugins,
};

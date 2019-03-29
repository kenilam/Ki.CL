import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {
  CSSLoaders,
  SCSSLoaders
} from './development';

const fallback = 'style-loader';

const loaders = loaders => [].concat(
  fallback,
  MiniCssExtractPlugin.loader,
  loaders.filter(({
    loader
  }) => loader !== fallback)
);

const rules = [{
    test: /\.css$/,
    use: loaders(CSSLoaders)
  },
  {
    test: /\.scss$/,
    use: loaders(SCSSLoaders)
  },
];

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'style.css',
    chunkFilename: 'style.[id].css',
  })
];

export default {
  module: {
    rules
  },
  plugins
};

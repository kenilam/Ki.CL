import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { CSSloaders, SCSSloaders } from './development';

const extractLoaders = loaders => loaders.filter(
  ({ loader }) => loader !== 'style-loader'
);

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: extractLoaders(CSSloaders),
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: extractLoaders(SCSSloaders),
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ]
};

export default config;

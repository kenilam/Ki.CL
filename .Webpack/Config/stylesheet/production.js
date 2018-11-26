import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { CSSloaders, SCSSloaders } from './development';

const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: CSSloaders.filter(
            ({ loader }) => loader !== 'style-loader'
          ),
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: SCSSloaders.filter(
            ({ loader }) => loader !== 'style-loader'
          ),
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

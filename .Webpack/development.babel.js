import webpackMerge from 'webpack-merge';

import {
  asset,
  bundleAnalyzer,
  content,
  devServer,
  entry,
  environment,
  fonts,
  images,
  indexHTML,
  javascript,
  optimization,
  output,
  resolve,
  stylesheet,
} from './Config';

const mode = process.env.NODE_ENV || 'development';

const devConfig = webpackMerge(
  asset,
  bundleAnalyzer,
  content,
  entry,
  environment,
  fonts,
  images,
  indexHTML,
  javascript,
  optimization,
  output,
  resolve,
  stylesheet,
);

const config = webpackMerge(devConfig, devServer, {
  mode
});

process.env.NODE_ENV = mode;

export {
  devConfig
};

export default config;

import webpackMerge from 'webpack-merge';

import {
  asset,
  bundleAnalyzer,
  clean,
  content,
  devServer,
  entry,
  environment,
  fonts,
  images,
  indexHTML,
  javascript,
  output,
  resolve,
  stylesheet
} from './Config';

const mode = process.env.NODE_ENV || 'development';

const devConfig = webpackMerge(
  asset,
  bundleAnalyzer,
  clean,
  content,
  entry,
  environment,
  fonts,
  images,
  indexHTML,
  javascript,
  output,
  resolve,
  stylesheet
);

const config = webpackMerge(devConfig, devServer, { mode });

process.env.NODE_ENV = mode;

export { devConfig };

export default config;

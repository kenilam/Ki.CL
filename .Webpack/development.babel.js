import webpackMerge from 'webpack-merge';

import {
  asset,
  bundleAnalyzer,
  devServer,
  entry,
  environment,
  fonts,
  glsl,
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
  entry,
  environment,
  fonts,
  images,
  indexHTML,
  javascript,
  glsl,
  optimization,
  output,
  stylesheet
);

const config = webpackMerge(devConfig, devServer, {
  mode,
  resolve,
});

process.env.NODE_ENV = mode;

export { devConfig };

export default config;

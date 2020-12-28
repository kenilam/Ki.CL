import { merge } from 'webpack-merge';

import {
  asset,
  bundleAnalyzer,
  clean,
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
  stylesheet
} from './Config';

const mode = process.env.NODE_ENV || 'development';

const basic = merge(
  asset,
  bundleAnalyzer,
  clean,
  entry,
  environment,
  fonts,
  glsl,
  images,
  indexHTML,
  javascript,
  optimization,
  output,
  stylesheet
);

const config = merge(basic, devServer, {
  mode,
  resolve,
});

process.env.NODE_ENV = mode;

export { basic };

export default config;

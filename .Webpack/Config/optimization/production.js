import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import { optimization } from './development';

const minimizer = [
  new OptimizeCSSAssetsPlugin(),
  new TerserJSPlugin({
    parallel: true,
    terserOptions: {
      ecma: 5,
      ie8: true,
      safari10: true,
      warnings: true,
    },
  }),
];

export default {
  optimization: Object.assign(optimization, {
    minimizer,
  }),
};

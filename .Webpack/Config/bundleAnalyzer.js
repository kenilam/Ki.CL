import { Args } from '!/Utilities'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const plugins = Args.analyzer ? [
  new BundleAnalyzerPlugin( {
    openAnalyzer: !Args.noBrowser,
    logLevel: 'warn',
    analyzerPort: 30001,
  } ),
] : [];

export default {
  plugins,
}

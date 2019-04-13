import { Args } from '!/Utilities'
import { path as root } from 'app-root-path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import { srcRoot as outputSrcRoot, tmpRoot } from './output'

const cleaner = new CleanWebpackPlugin()

export default {
  plugins: [cleaner],
}

import CleanWebpackPlugin from 'clean-webpack-plugin'

const cleaner = new CleanWebpackPlugin()

export default {
  plugins: [cleaner],
}

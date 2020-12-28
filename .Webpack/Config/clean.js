import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const cleaner = new CleanWebpackPlugin({protectWebpackAssets: false});

export default {
  plugins: [cleaner],
};

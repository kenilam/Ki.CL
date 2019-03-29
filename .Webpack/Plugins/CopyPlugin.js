import {
  path as appRoot
} from 'app-root-path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

class CopyPlugin {
  constructor({
    srcRoot,
    dest
  }) {
    return new CopyWebpackPlugin([{
      cache: true,
      debug: 'debug',
      to: `${dest}/[path]/[name].[ext]`,
      from: '**/*',
      context: `${appRoot}/${srcRoot}`,
    }, ]);
  }
}

export default CopyPlugin;

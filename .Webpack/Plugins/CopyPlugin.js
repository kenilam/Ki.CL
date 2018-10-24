import { path as appRoot } from 'app-root-path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

class CopyPlugin {
    constructor({ srcRoot }) {
        return new CopyWebpackPlugin([
            {
                cache: true,
                debug: 'debug',
                to: '[path]/[name].[ext]',
                from: '**/*',
                context: `${appRoot}/${srcRoot}`
            }
        ]);
    }
}

export default CopyPlugin;

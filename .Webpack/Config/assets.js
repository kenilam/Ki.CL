import { path as appRoot } from 'app-root-path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const srcRoot = 'project/assets';

const config = ({
    plugins : [
        new CopyWebpackPlugin([
            {
                cache : true,
                debug : 'debug',
                to : '[path]/[name].[ext]',
                from : '**/*',
                context : `${appRoot}/${srcRoot}`
            }
        ])
    ]
});

export { srcRoot };
export default config;

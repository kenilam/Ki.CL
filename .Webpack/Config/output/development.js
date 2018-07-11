import { publicPath, srcRoot, tmpRoot, output } from './production';

const config = {
    output: {
        ...output,
        hotUpdateChunkFilename: `${tmpRoot}/[id].[hash].hot-update.js`,
        hotUpdateMainFilename: `${tmpRoot}/[hash].hot-update.js`
    }
};

export { publicPath, srcRoot, tmpRoot };
export default config;

import { path as appRoot } from 'app-root-path';

const projectRoot = 'project';
const srcRoot = `${projectRoot}/build`;
const tmpRoot = `${projectRoot}/.tmp`;
const publicPath = '/';

const config = {
    output : {
        hotUpdateChunkFilename : `${tmpRoot}/[id].[hash].hot-update.js`,
        hotUpdateMainFilename : `${tmpRoot}/[hash].hot-update.js`,
        filename : 'app.js',
        path : `${appRoot}/${srcRoot}`,

        publicPath
    }
};

export { publicPath, srcRoot, tmpRoot };
export default config;

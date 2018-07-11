import { path as appRoot } from 'app-root-path';

const projectRoot = 'project';
const srcRoot = `${projectRoot}/build`;
const tmpRoot = `${projectRoot}/.tmp`;
const publicPath = '/';

const output = {
    filename: 'app.js',
    path: `${appRoot}/${srcRoot}`,
    publicPath
};

const config = { output };

export { publicPath, srcRoot, tmpRoot, output };
export default config;

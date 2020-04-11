import { path as appRoot } from 'app-root-path';

const projectRoot = 'project';
const srcRoot = `${projectRoot}/build`;
const tmpRoot = `${projectRoot}/.tmp`;
const publicPath = '/';

const output = {
  filename: 'app.js',
  path: `${appRoot}/${srcRoot}`,
  publicPath,
  hotUpdateChunkFilename: `${tmpRoot}/[id].[hash].hot-update.js`,
  hotUpdateMainFilename: `${tmpRoot}/[hash].hot-update.js`,
};

export { publicPath, srcRoot, tmpRoot, output };
export default {
  output,
};

import { path as appRoot } from 'app-root-path';

const tmp = '.tmp';
const projectRoot = 'project';
const srcRoot = `${projectRoot}/build`;
const tmpRoot = `${projectRoot}/${tmp}`;
const publicPath = '/';

const output = {
  filename: 'app.js',
  hotUpdateChunkFilename: `${tmpRoot}/[id].[fullhash].[hash].hot-update.js`,
  hotUpdateMainFilename: `${tmpRoot}/[fullhash].[hash].hot-update.js`,
  path: `${appRoot}/${srcRoot}`,
  publicPath
};

const target = 'web';

export { publicPath, srcRoot, target, tmpRoot, output, tmp };
export default {
  output,
  target
};

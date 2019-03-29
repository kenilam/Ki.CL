import CopyPlugin from '!/Plugins/CopyPlugin';

const srcRoot = 'project/asset';

const copier = new CopyPlugin({
  srcRoot,
  dest: 'asset'
});

export {
  srcRoot
};
export default {
  plugins: [copier],
};

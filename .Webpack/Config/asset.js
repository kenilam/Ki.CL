import CopyPlugin from '!/Plugins/CopyPlugin';

const srcRoot = 'Project/asset';

const copier = new CopyPlugin({
  srcRoot,
  dest: 'asset',
});

export { srcRoot };
export default {
  plugins: [copier],
};

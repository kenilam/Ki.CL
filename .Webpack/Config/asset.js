import CopyPlugin from '!/Plugins/CopyPlugin';

const srcRoot = 'project/asset';

const copier = new CopyPlugin({ srcRoot });

export { srcRoot };
export default {
  plugins: [copier]
};

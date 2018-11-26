import CopyPlugin from '!/Plugins/CopyPlugin';

const srcRoot = 'project/asset';

const config = {
  plugins: [new CopyPlugin({ srcRoot })]
};

export { srcRoot };
export default config;

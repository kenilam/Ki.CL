import CopyPlugin from '!/Plugins/CopyPlugin';

const srcRoot = 'project/content';

const copier = new CopyPlugin({ srcRoot });

export { srcRoot };
export default {
    plugins: [copier]
};

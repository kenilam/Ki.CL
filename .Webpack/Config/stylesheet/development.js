import { path as appRoot } from 'app-root-path';
import glob from 'glob';

const CSSloaders = [
    { loader: 'style-loader' },
    {
        loader: 'css-loader',
        options: {
            sourceMap: true,
            importLoaders: 1
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            config: { path: `${appRoot}/.postcssrc.js` }
        }
    }
];

const SCSSloaders = [].concat(CSSloaders, {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
        includePaths: [
            `${appRoot}/node_modules`,
            `${appRoot}/project`,
            `${appRoot}/project/src`
        ]
    }
});

const resources = [
    `${appRoot}/node_modules/sass-{*}/**/_*.scss`,
    `${appRoot}/project/**/_*.scss`
];

const hasInitialResources = resources.some(path => glob.sync(path).length > 0);

if (hasInitialResources) {
    SCSSloaders.push({
        loader: 'sass-resources-loader',
        options: { sourceMap: true, resources }
    });
}

const rules = [
    { test: /\.css$/, use: CSSloaders },
    { test: /\.scss$/, use: SCSSloaders }
];

export { CSSloaders, SCSSloaders };
export default {
    module: { rules }
};

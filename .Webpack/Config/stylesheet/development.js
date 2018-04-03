import glob from 'glob';
import { path as appRoot } from 'app-root-path';

const CSSloaders = [
    {
        loader : 'style-loader'
    },
    {
        loader  : 'css-loader',
        options  : {
            sourceMap  : true,
            importLoaders  : 1
        }
    },
    {
        loader  : 'postcss-loader',
        options  : {
            sourceMap  : true,
            config  : {
                path  : `${appRoot}/.postcssrc.js`
            }
        }
    },
    { loader : 'resolve-url-loader' }
];

const SCSSloaders = [].concat(
    CSSloaders,
    {
        loader  : 'sass-loader',
        options  : {
            sourceMap  : true,
            includePaths  : [
                `${appRoot}/node_modules`,
                `${appRoot}/src`
            ]
        }
    }
);

const sassResources = glob.sync(`${appRoot}/src/**/_*.scss`);

if (sassResources[0]) {
    SCSSloaders.push({
        loader : 'sass-resources-loader',
        options : {
            resources : sassResources
        }
    })
}

const config = {
    module : {
        rules : [
            {
                test : /\.css$/,
                use : CSSloaders
            },
            {
                test : /\.scss$/,
                use : SCSSloaders
            },
        ]
    }
};

export { CSSloaders, SCSSloaders }
export default config;

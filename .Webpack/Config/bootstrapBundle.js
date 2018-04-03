import { path as appRoot } from 'app-root-path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { Args, Loop, SupportedLocales } from '!/Utilities';

import config from '^/ki-cl.config';

const srcRoot = `${appRoot}/src/Template`;

const bootstrap = 'bootstrap';
const bundle = 'bundle';
const content = 'content';
const resources = 'resources';

const format = 'json';

const interpolator = ({ product, locale }) => content => {
    return content.toString()
        .replace(/{{deviceType}}/g, config.bundle[product].deviceType)
        .replace(/{{locale}}/g, locale)
        .replace(/{{product}}/g, product);
}

const options = {
    cache : true,
    debug : 'debug',
    context : srcRoot
};

const copiers = [];

Loop( Args.locales, Args.products, ( locale, product ) => {
    let alternativeLocale = SupportedLocales( locale );

    alternativeLocale = alternativeLocale.filter( alt => alt !== locale )[0];

    copiers.push(
        Object.assign( {
            from : `${bootstrap}.${format}`,
            to :`${locale}/${product}/[name].[ext]`,
            transform : interpolator({ product, locale })
        }, options )
    );

    copiers.push(
        Object.assign( {
            from : `${content}.${bundle}.${format}`,
            to :`${locale}/${product}/${bundle}.[ext]`,
            transform : function ( content ) {
                content = interpolator({ product, locale })( content );

                if (!alternativeLocale) {
                    return content;
                }

                content = JSON.parse( content );

                const peerDependencies = {
                    [ `${product}-${alternativeLocale}` ] : content.dependencies[ `${resources}-${product}` ]
                };

                return JSON.stringify( Object.assign( content, { peerDependencies } ), null, 2 );
            }
        }, options )
    );
});

Args.products.forEach( product => {
    copiers.push(
        Object.assign( {
            from : `${resources}.${bundle}.${format}`,
            to :`${resources}/${product}/${bundle}.[ext]`,
            transform : interpolator({ product })
        }, options )
    );
} );

export { srcRoot };
export default {
    plugins : [
        new CopyWebpackPlugin( copiers )
    ]
};

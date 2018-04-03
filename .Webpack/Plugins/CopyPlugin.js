import { path as appRoot } from 'app-root-path';
import { readdirSync } from 'fs';

import CopyWebpackPlugin from 'copy-webpack-plugin';

import { Args, Loop } from '!/Utilities';

class CopyPlugin {
    constructor ({ formatTo, modifier, modifierOptions, pattern, srcRoot, options }) {
        options = options || {};

        options.modifier = options.modifier || {};

        const contextRoot = `${appRoot}/${srcRoot}`;

        const transform = modifier
            ? (content, path) => modifier( options.modifier.readPath ? path : content )
            : false;

        const config = (to, contexts) => contexts.map(
            context => ({
                cache : true,
                debug : 'debug',
                to : `${to}/[path]/[name].${formatTo || '[ext]'}`,
                from : pattern || '**/*',
                
                transform,
                context
            })
        );

        const rootDir = readdirSync(contextRoot);

        const productAtRoot = Args.productsWithShared.some(
            product => rootDir.some( dir => product === dir )
        );

        const configs = productAtRoot
            // Copy product related files from contextRoot
            ? Args.products.map(
                product => config(
                    options.ignoreSrcRoot
                        ? product
                        : options.prefixSrcRoot
                            ? `${srcRoot}/${product}`
                            : `${product}/${srcRoot}`,
                    [
                        `${contextRoot}/${Args.shared}`,
                        `${contextRoot}/${product}`
                    ]
                )
            )

            // Copy locale specific product files from contextRoot
            : Loop(
                Args.locales,
                Args.products,
                ( locale, product ) => {
                    const to = `${locale}/${product}`;
                    
                    return config(
                        options.ignoreSrcRoot
                            ? to
                            : options.prefixSrcRoot
                                ? `${srcRoot}/${to}`
                                : `${to}/${srcRoot}`,
                        [
                            `${contextRoot}/${Args.worldWide}/${Args.shared}`,
                            `${contextRoot}/${Args.worldWide}/${product}`,
                            `${contextRoot}/${locale}/${Args.shared}`,
                            `${contextRoot}/${locale}/${product}`,

                            // Handle lower-case folder (en_ww for example)
                            `${contextRoot}/${Args.worldWide.toLowerCase()}/${Args.shared}`,
                            `${contextRoot}/${Args.worldWide.toLowerCase()}/${product}`,
                            `${contextRoot}/${locale.toLowerCase()}/${Args.shared}`,
                            `${contextRoot}/${locale.toLowerCase()}/${product}`
                        ]
                    )
                }
            )

        return new CopyWebpackPlugin( [].concat(...configs) );
    }
}

export default CopyPlugin;

import fs from 'fs';
import { path as appRoot } from 'app-root-path';
import { argv } from 'yargs';

let { env } = argv;

if (!env) {
    env = {};
}

const rootDir = `${appRoot}/content`;

const envValues = name => ( env[ name ] || '' ).split(',').filter( value => value );

const whichBoolean = type => Boolean( env[ type ] ) || false;

// Mainly to filter out .DS_Store file or other than directories
const isDirectory = path => fs.existsSync( `${rootDir}/${path}` ) && fs.lstatSync( `${rootDir}/${path}` ).isDirectory();

const isNotDS_Store = path => path !== 'DS_Store';

class Arguments {
    static get worldWide () {
        return 'en_WW'
    }

    static get shared () {
        return 'shared'
    }

    static get global () {
        return [ Arguments.worldWide, Arguments.shared ];
    }

    static isGlobal ( list ) {
        return [].concat( list ).some(
            item => Arguments.global.some( g => new RegExp( g ).test( list ) )
        )
    }

    static isValid ( path ) {
        return !Arguments.isGlobal( path ) && isDirectory( path )
    }

    static isValidLocale ( locale ) {
        return Arguments.isValid( locale ) && Arguments.default.locales.some( loca => loca === locale )
    }

    static isValidProduct ( product ) {
        return Arguments.default.products.some( prod => prod === product )
    }

    static get default () {
        const locales = fs.readdirSync( rootDir ).filter(
            locale => !Arguments.isGlobal( locale ) && isDirectory( locale ) && isNotDS_Store( locale )
        );

        let products = locales.map(
            locale => fs.readdirSync( `${rootDir}/${locale}` ).filter(
                product => !Arguments.isGlobal( product ) && isDirectory( `${locale}/${product}` )
            )
        );

        // Concat the products chunck into one array without any duplication
        products = Array.from( new Set( [].concat( ...products ) ) ).filter( isNotDS_Store );

        return { locales, products }
    }

    static get locales () {
        const locales = envValues( 'locales' ).filter( Arguments.isValidLocale );

        if ( locales.length === 0 ) {
            return Arguments.default.locales;
        }

        return locales;
    }

    static get products () {
        let products = envValues( 'products' ).filter( Arguments.isValidProduct );

        if ( products.length === 0 ) {
            products = Arguments.default.products;
        }

        products = products.filter(
            product => Arguments.locales.some(
                locale => fs.readdirSync( `${rootDir}/${locale}` ).some(
                    prod => prod === product
                )
            )
        );

        return products;
    }

    static get localesWithWorldWide () {
        return [].concat( Arguments.worldWide, Arguments.locales );
    }

    static get productsWithShared () {
        return [].concat( Arguments.shared, Arguments.products );
    }

    static get analyzer () {
        return whichBoolean( 'analyzer' );
    }

    static get noBrowser () {
        return whichBoolean( 'noBrowser' );
    }

    static get noWatch () {
        return whichBoolean( 'noWatch' );
    }

    static get verbose () {
        return whichBoolean( 'verbose' );
    }
}

export default Arguments;


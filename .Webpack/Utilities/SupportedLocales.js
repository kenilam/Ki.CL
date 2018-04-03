import { Args } from '!/Utilities';

export default locale => {
    let code = locale.split('_');

    code = code[ code.length - 1 ];

    return Args.default.locales.filter( loc => loc.endsWith( code ) );
}

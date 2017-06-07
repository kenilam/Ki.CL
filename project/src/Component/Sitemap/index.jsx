'use strict';

import dot from 'dot-object';

let map = {};

class Sitemap {
    static set (notation, property) {
        if (!notation) {
            console.warning('notation is required to set sitemap');

            return;
        }

        dot.str(notation, property, map);
    }

    static get (notation) {
        if (!notation) {
            return map;
        }

        return dot.pick(notation, map);
    }
}

export default Sitemap;
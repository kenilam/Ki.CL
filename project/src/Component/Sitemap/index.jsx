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

    static filter (map, options) {
        const filteredMap = {};

        let names = Object.keys(map);

        if (options) {
            if (options.without) {
                names = names.filter(
                    name => ![].concat(options.without).some(without => without === name)
                );
            }
        }

        if (names.length === 0) {
            return map;
        }

        names.forEach(
            name => filteredMap[name] = map[name]
        );

        return filteredMap;
    }
}

export default Sitemap;
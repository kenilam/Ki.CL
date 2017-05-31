'use strict';

class Sitemap {
    constructor () {
        this.map = {};
    }

    set (property, mapping) {
        mapping = mapping || '';

        const steps = mapping.split('.');

        let parent = this.map;

        steps.forEach(
            (step, index) => {
                if (!parent[step]) {
                    parent[step] = {};
                }

                if (index === steps.length - 1) {
                    parent[step] = property;

                    return;
                }

                parent = parent[step];
            }
        );
    }

    get (mapping) {
        mapping = mapping || '';

        try {
            return eval(`this.map${mapping ? `.${mapping}` : ''}`);
        } catch (error) {
            return undefined;
        }
    }
}

export default new Sitemap();
'use strict';

import marked from 'marked';

class MarkDown {
    static transform (value) {
        return value
            .replace(new RegExp('\\[@(.+?)\\]', 'g'), `<cite>$1</cite>`)
            .replace(new RegExp('\\{\\{DATA:(.+?)\\}\\}', 'g'), `<data>$1</data>`)
            .replace(new RegExp('\\^\\^(.+?)\\^\\^', 'g'), `<sub>$1</sub>`)
            .replace(new RegExp('\\^(.+?)\\^', 'g'), `<sup>$1</sup>`)
            .replace(new RegExp('\\{\\{(.+?)\\}\\}', 'g'), `<span class="nowrap">$1</span>`)
            .replace(/"/g, `\"`);
    }
    
    static convert (name, props) {
        const type = typeof props;
        let result;

        if (type === 'object') {
            result = {};

            Object.keys(props).forEach(
                name => result[name] = MarkDown.convert(name, props[name])
            );
        } else {
            result = MarkDown.transform(marked(props));
            switch (name) {
                case 'name':
                case 'brand':
                case 'model':
                case 'mpn':
                case 'isNew':
                case 'isRelatedTo':
                case 'variant':
                case 'src':
                case 'width':
                case 'height':
                    result = result
                        .replace(new RegExp('<p>(.+?)</p>\\n', 'g'), `$1`);
                    break;
            }
        }

        return JSON.parse(JSON.stringify(result, null, ' '));
    }
}

export default MarkDown;
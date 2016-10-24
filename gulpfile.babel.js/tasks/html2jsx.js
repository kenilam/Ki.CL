'use strict';

import path from 'path';

import gulp from 'gulp';

import gulpData from 'gulp-data';
import gulpHtml2jsx from 'gulp-html2jsx';
import htmltojsx from 'htmltojsx';
import esformatter from 'esformatter';
import esformatterJSX from 'esformatter-jsx';

import debug from 'gulp-debug';

esformatter.register(esformatterJSX);

const esformatterConfig = {
    "formatJSX": true, //Duh! that's the default 
    "attrsOnSameLineAsTag": false, // move each attribute to its own line 
    "maxAttrsOnTag": 3, // if lower or equal than 3 attributes, they will be kept on a single line 
    "firstAttributeOnSameLine": true, // keep the first attribute in the same line as the tag 
    "formatJSXExpressions": true, // default true, if false jsxExpressions won't be recursively formatted 
    "JSXExpressionsSingleLine": true, // default true, if false the JSXExpressions might span several lines 
    "alignWithFirstAttribute": false, // do not align attributes with the first tag 
    "spaceInJSXExpressionContainers": " ", // default to one space. Make it empty if you don't like spaces between JSXExpressionContainers 
    "removeSpaceBeforeClosingJSX": false, // default false. if true <React.Something /> => <React.Something/> 
    "htmlOptions": {
      // put here the options for js-beautify.html 
    }
};

class HTML2JSX {
    constructor () {
        this.config = {
            createClass: true
        };

        return this.compile.bind(this);
    }

    interpolate (className, markup) {
        className = className.split('.').map(name => {
            return name.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        }).join('');

        return [
            "'use strict';",
            '',
            ['class', className, '{'].join(' '),
            'constructor () {',
            'return this.init.bind(this);',
            '}',
            '',
            'init () {',
            'return React.createClass({',
            'render: () => {',
            'return (',
            '<div>',
            markup,
            '</div>',
            ');',
            '}',
            '});',
            '}',
            '}',
            '',
            ['export default new', className, '();'].join(' ')
        ].join('\n');
    }

    compile () {
        return gulpData((file, callback) => {
            const extname = path.extname(file.path);
            
            this.config.outputClassName = path.basename(file.path).replace(extname, '');

            const className = path.basename(file.path).replace(extname, '');

            file.contents = new Buffer(esformatter.format(this.interpolate(className, file.contents.toString())));
            file.path = file.path.replace('.html', '.js');

            callback(null, file);
        });
    }
}

export default new HTML2JSX();


'use strict';

class HtmlWebpackHtmlReplace {
    constructor (options) {
        this.options = options;

        this.rootRegExp = new RegExp(this.options.replacePath, 'g');
    }

    replaceRoot (html) {
        html = html.replace(this.rootRegExp, '');
    }

    afterHtmlProcessing (data, callback) {
        this.replaceRoot(data.html);

        callback(null, data);
    }

    afterExtractTestEmit (data, callback) {
        console.log('');
        console.log('==== ==== ==== ====');
        console.log(data);
        console.log('');
        console.log('==== ==== ==== ====');
    }

    onCompilation (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', this.afterHtmlProcessing.bind(this));
        compilation.plugin('extract-text-plugin-after-emit', this.afterExtractTestEmit.bind(this));
    }

    apply (compiler) {
        compiler.plugin('compilation', this.onCompilation.bind(this));
    }
}

module.exports = HtmlWebpackHtmlReplace;
'use strict';

class HtmlWebpackRootReplace {
    constructor (options) {
        this.options = options;

        this.path = new RegExp(this.options.replacePath, 'g');
    }

    afterProcessing (data, callback) {
        data.html = data.html.replace(this.path, '');

        callback(null, data);
    }

    onCompilation (compilation) {
        compilation.plugin('html-webpack-plugin-after-html-processing', this.afterProcessing.bind(this));
    }

    apply (compiler) {
        compiler.plugin('compilation', this.onCompilation.bind(this));
    }
}

export default HtmlWebpackRootReplace;
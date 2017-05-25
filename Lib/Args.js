'use strict';

class Args {
    constructor () {
        this.args = {};

        process.argv.slice(2).forEach(value => {
            const val = value.split('=');

            this.args[val[0]] = val[1];
        });

        return this.args;
    }
}

module.exports = new Args();
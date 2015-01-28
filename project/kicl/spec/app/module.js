'use strict';

describe('module', function () {
    var service;
    
    beforeEach(module('kicl'));

    it(
        'should obtain a constant name config',
        inject(function (config) {
            expect(config).not.toBeNull();
        })
    );
});


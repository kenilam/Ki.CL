'use strict';

describe('service.async', function () {
    var service;
    
    beforeEach(module('kicl'));

    beforeEach(
        inject(
            function ($injector) {
                service = $injector.get('async');
            }
        )
    );

    it(
        'should obtain a async service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


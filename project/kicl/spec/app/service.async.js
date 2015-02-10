'use strict';

describe('service.async', function () {
    var service;
    
    beforeEach(
        function () {
            module('kicl');

            inject(
                function ($injector) {
                    service = $injector.get('async');
                }
            )
        }
    );

    it(
        'should obtain a async service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


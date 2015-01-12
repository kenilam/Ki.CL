'use strict';

describe('service.tween', function () {
    var service;
    
    beforeEach(module('kicl'));

    beforeEach(
        inject(
            function ($injector) {
                service = $injector.get('tween');
            }
        )
    );

    it(
        'should obtain a tween service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


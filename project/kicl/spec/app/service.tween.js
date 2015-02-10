'use strict';

describe('service.tween', function () {
    var service;
    
    beforeEach(
        function () {
            module('kicl');

            inject(
                function ($injector) {
                    service = $injector.get('tween');
                }
            )
        }
    );

    it(
        'should obtain a tween service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


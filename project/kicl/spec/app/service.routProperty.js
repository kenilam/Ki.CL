'use strict';

describe('service.routeProperty', function () {
    var service;
    
    beforeEach(
        function () {
            module('kicl');

            inject(
                function ($injector) {
                    service = $injector.get('routeProperty');
                }
            )
        }
    );

    it(
        'should obtain a routeProperty service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


'use strict';

describe('service.routeProperty', function () {
    var service;

    beforeEach(module('kicl'));

    beforeEach(
        inject(
            function ($injector) {
                service = $injector.get('routeProperty');
            }
        )
    );

    it(
        'should obtain a routeProperty service',
        inject(function () {
            expect(service).not.toBeNull();
        })
    );
});


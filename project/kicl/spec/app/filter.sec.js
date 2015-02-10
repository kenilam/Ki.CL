'use strict';

describe('filter.async', function () {
    var filter;
    
    beforeEach(
        function () {
            module('kicl');

            inject(function (_$filter_) { //<-- Get the filter provider
                filter = _$filter_;
            })
        }
    );

    it(
        'should obtain a sec filter',
        inject(function () {
            expect(filter('sec')("john")).toEqual("John");
        })
    );
});


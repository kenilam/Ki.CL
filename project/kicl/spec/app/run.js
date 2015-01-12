'use strict';

describe('run', function () {
    beforeEach(module('kicl'));

    beforeEach(
        inject(
            function ($injector) {
                this.location = $injector.get('$location');
                this.root = $injector.get('$rootScope');
                this.state = $injector.get('$state');
                this.stateParams = $injector.get('$stateParams');
                this.async = $injector.get('async');
                this.config = $injector.get('config');
            }
        )
    );

    it(
        'should have all dependencies defined',
        function () {
            expect(this.root.info).toBeDefined();
            expect(this.root.info.protocol).toBe(location.protocol)
            expect(this.root.info.host).toBe(location.hostname);
            expect(this.root.info.port).toBe(location.port);

            expect(this.root.helper).toBeDefined();
            expect(this.root.helper._).toBeDefined();
            expect(this.root.helper.moment).toBeDefined();

            expect(this.root.resource).toBeDefined();
            expect(this.root.resource.$promise).toBeDefined();

            expect(this.root.$state).toBeDefined();
            expect(this.root.$stateParams).toBeDefined();
        }
    );
});


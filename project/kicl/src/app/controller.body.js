(
    function (app) {
        'use strict';
        
        app
            .controller('body',
                [
                    '$rootScope', '$scope', '$timeout', '$interval',
                    function (root, scope, timeout, interval) {
                        scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                            root.resource.$promise.then(function (resource) {
                                scope.status = resource.status;

                                timeout.cancel(scope.timer);
                                scope.timer = timeout(function () {
                                    scope.ready = true;
                                }, 1500);
                            });
                        });
                    }
                ]
            );
    }
)(kicl);
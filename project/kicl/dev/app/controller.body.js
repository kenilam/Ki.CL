"use strict";
(
    function (app) {
        app.controller('body', [
            '$rootScope', '$scope', '$timeout',
            function (root, scope, timeout) {
                scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    scope.route = _.toArray(toParams).join('.');

                    scope.init = root.init;

                    root.resource.$promise.then(function (resource) {
                        scope.status = resource.status;

                        timeout.cancel(scope.timer);
                        scope.timer = timeout(function () {
                            scope.ready = true;
                        }, 1500);
                    })
                });
            }
        ]);
    }
)(kicl);
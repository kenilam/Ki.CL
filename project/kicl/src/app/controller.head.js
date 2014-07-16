"use strict";
(
    function (app) {
        app.controller('head', [
            '$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'config',
            function (root, scope, state, stateParams, timeout, config) {
                root.resource.$promise.then(function (resource) {
                    scope.info = resource.info;

                    scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        scope.routes = _.toArray(toParams).join(' | ').toUpperCase();
                    });
                });
            }
        ]);
    }
)(kicl);
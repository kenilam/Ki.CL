"use strict";
(
    function (app) {
        app.directive('logo', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/logo.html',
                controller: [
                    '$rootScope', '$scope', '$state', '$stateParams', 'config',
                    function (root, scope, state, stateParams, config) {
                        root.resource.$promise.then(function (resource) {
                            var state = _.first(_.rest(config.route.map.split('/:')));

                            scope.logo = {
                                name : resource.info.name,
                                route : state + '({' + state + ':"' + config.route.index + '"})'
                            };
                        });
                    }
                ]
            }
        });
    }
)(kicl);

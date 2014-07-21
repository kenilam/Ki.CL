"use strict";
(
    function (app) {
        app.directive('breadcrumb', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/breadcrumb.html',
                controller: [
                    '$rootScope', '$scope', 'config',
                    function (root, scope, config) {
                        var idx = 0,
                            params,
                            ref = {},
                            route = _.rest(config.route.map.split('/:'));

                        scope.breadcrumb = {
                            root : {
                                name : config.route.index,
                                route : route[idx] + '({' + route[idx] + ':"' + config.route.index + '"})'
                            }
                        };

                        scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                            scope.breadcrumb.list = _.reject(
                                _.map(toParams, function (name, state) {
                                    idx ++;
                                    return {
                                        name : name,
                                        route : route.slice(0, idx).join('.') + '({' + route[idx - 1] + ':"' + name + '"' + '})'
                                    }
                                }
                            ), function (obj) { return obj.name === config.route.index; });

                            scope.breadcrumb.state = _.toArray(toParams).join('.');

                            idx = 0;
                        });
                    }
                ]
            }
        });
    }
)(kicl);

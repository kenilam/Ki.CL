(
    function (app) {
        'use strict';
        
        app
            .service('breadcrumb_link',
                [
                    '$rootScope', 'config',
                    function (root, config) {
                        return function (scope, elm) {
                            var idx = 0,
                                route = _.rest(config.route.map.split('/:'));

                            scope.breadcrumb = {
                                root : {
                                    name : config.route.index,
                                    route : route[idx] + '({' + route[idx] + ':"' + config.route.index + '"})'
                                }
                            };

                            scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                                scope.breadcrumb.list = _.reject(
                                    _.map(toParams, function (name) {
                                        idx ++;

                                        return {
                                            name : name,
                                            route : route.slice(0, idx).join('.') + '({' + route[idx - 1] + ':"' + name + '"' + '})'
                                        };
                                    }
                                ), function (obj) { return obj.name === config.route.index; });

                                scope.breadcrumb.state = _.toArray(toParams).join('.');

                                idx = 0;
                            });
                        };
                    }
                ]
            )
            .directive('breadcrumb',
                [
                    'breadcrumb_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'partial/breadcrumb.html',
                            link: link
                        };
                    }
                ]
            );
    }
)(kicl);

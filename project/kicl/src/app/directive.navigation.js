(
    function (app) {
        'use strict';
        
        app
            .service('navigation_link',
                [
                    '$rootScope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function (root, stateParams, timeout, routeProperty, config) {
                        return function (scope, elm) {
                            var route = _.rest(config.route.map.split('/:')),
                                assign = function (data) {
                                    scope.navigation = {
                                        list : routeProperty(data.navigation),
                                        state : {}
                                    };

                                    timeout.cancel(scope.timer);
                                    scope.timer = timeout(function () {
                                        scope.navigation.route = route[_.toArray(stateParams).length];
                                    }, 0);

                                    scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                                        scope.navigation.state = toParams;
                                    });
                                };
                            
                            if(!scope.navigation) {
                                scope.$on('navigation', function (evt, data) {
                                    assign(data);
                                });
                            } else {
                                assign({sitemap: scope.sitemap});
                            }
                        };
                    }
                ]
            )
            .directive('navigation',
                [
                    'navigation_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'partial/navigation.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(kicl);

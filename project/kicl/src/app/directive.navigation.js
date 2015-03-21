(
    function init (app) {
        'use strict';
        
        app
            .service('navigation_link',
                [
                    '$rootScope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function link (root, stateParams, timeout, routeProperty, config) {
                        return function trigger (scope, elm) {
                            var route = _.rest(config.route.map.split('/:')),
                                assign = function (data) {
                                    scope.navigation = {
                                        list : routeProperty(data.navigation),
                                        state : {}
                                    };

                                    timeout.cancel(scope.timer);
                                    scope.timer = timeout(function timer () {
                                        scope.navigation.route = route[_.toArray(stateParams).length];
                                    }, 0);

                                    scope.$on('$stateChangeSuccess', function stateChangeSuccess (event, toState, toParams) {
                                        scope.navigation.state = toParams;
                                    });
                                };
                            
                            if(scope.navigation) {
                                assign({sitemap: scope.sitemap});

                                return;
                            }
                            
                            scope.$on('navigation', function navigation (evt, data) {
                                assign(data);
                            });
                        };
                    }
                ]
            )
            .directive('navigation',
                [
                    'navigation_link',
                    function directive (link) {
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

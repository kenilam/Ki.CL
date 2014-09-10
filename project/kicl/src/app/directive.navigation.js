(
    function (app) {
        app.directive('navigation', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/navigation.html',
                controller: [
                    '$rootScope', '$scope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function (root, scope, stateParams, timeout, routeProperty, config) {
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
                        
                        if(!scope.$parent.navigation) {
                            scope.$on('navigation', function (evt, data) {
                                assign(data);
                            });
                        } else {
                            assign({sitemap: scope.$parent.sitemap});
                        }

                        scope._ = _;
                    }
                ]
            }
        });
    }
)(kicl);

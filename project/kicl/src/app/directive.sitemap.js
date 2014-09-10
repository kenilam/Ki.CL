(
    function (app) {
        app.directive('sitemap', function () {
            return {
                restrict: 'AE',
                replace: true,
                scope : {
                    'isolate' : '&'
                },
                templateUrl: 'partial/sitemap.html',
                controller: [
                    '$rootScope', '$scope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function (root, scope, stateParams, timeout, routeProperty, config) {
                        var route = _.rest(config.route.map.split('/:')),
                            assign = function (data) {
                                scope.sitemap = {
                                    list : routeProperty(data.sitemap, true),
                                    state : {}
                                };

                                timeout.cancel(scope.timer);
                                scope.timer = timeout(function () {
                                    scope.sitemap.route = route[_.toArray(stateParams).length];
                                }, 0);

                                scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
                                    scope.sitemap.state = toParams;
                                });
                            };
                        
                        if(!scope.$parent.sitemap) {
                            scope.$on('sitemap', function (evt, data) {
                                assign(data);
                            });
                        } else {
                            assign({sitemap: scope.$parent.sitemap});
                        }

                        root.resource.$promise.then(function (resource) {
                            scope.resource = resource.component.sitemap;
                        });

                        scope._ = _;
                    }
                ]
            }
        });
    }
)(kicl);

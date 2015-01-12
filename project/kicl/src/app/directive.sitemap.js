(
    function (app) {
        'use strict';
        
        app
            .service('sitemap_link',
                [
                    '$rootScope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function (root, stateParams, timeout, routeProperty, config) {
                        return function (scope, elm) {
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
                        };
                    }
                ]
            )
            .directive('sitemap',
                [
                    'sitemap_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            scope : {
                                'isolate' : '&'
                            },
                            templateUrl: 'partial/sitemap.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(kicl);

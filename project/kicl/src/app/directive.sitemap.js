(
    function init (app) {
        'use strict';
        
        app
            .service('sitemap_link',
                [
                    '$rootScope', '$stateParams', '$timeout', 'routeProperty', 'config',
                    function link (root, stateParams, timeout, routeProperty, config) {
                        return function trigger (scope, elm) {
                            var route = _.rest(config.route.map.split('/:')),
                                assign = function (data) {
                                    scope.sitemap = {
                                        list : routeProperty(data.sitemap, true),
                                        state : {}
                                    };

                                    timeout.cancel(scope.timer);
                                    scope.timer = timeout(function timer () {
                                        scope.sitemap.route = route[_.toArray(stateParams).length];
                                    }, 0);

                                    scope.$on('$stateChangeSuccess', function stateChangeSuccess (event, toState, toParams) {
                                        scope.sitemap.state = toParams;
                                    });
                                };

                            root.resource.$promise.then(function promise (resource) {
                                scope.resource = resource.component.sitemap;
                            });
                            
                            if(scope.$parent.sitemap) {
                                assign({sitemap: scope.$parent.sitemap});
                                return;
                            }
                            
                            scope.$on('sitemap', function sitemap (evt, data) {
                                assign(data);
                            });
                        };
                    }
                ]
            )
            .directive('sitemap',
                [
                    'sitemap_link',
                    function directive (link) {
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

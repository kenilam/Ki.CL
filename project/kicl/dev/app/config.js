"use strict";
(
    function (app) {
        app
            .config([
                '$stateProvider',
                '$urlRouterProvider',
                'config',
                function (stateProvider, urlRouterProvider, config) {
                    var route = config.route,
                        map = route.map,
                        routes = _.rest(map.split('/:'));

                    _.each(routes, function (route, key) {
                        stateProvider.state(routes.slice(0, key + 1).join('.'), {
                            url : '/:' + route,
                            views : {
                                'view' : {
                                    templateUrl : function (state) {
                                        var page = function (idx) { return state[routes[idx]] ? routes[idx] : page(idx - 1); };
                                        return 'view/' + state.section + '/' + page(routes.length - 1) + '.html';
                                    },
                                    controller : [
                                        '$rootScope', '$scope', '$state', '$stateParams',
                                        function (root, scope, state, stateParams) {
                                            var setContent = function (contents) {
                                                var ctn = undefined;

                                                ctn = _.findWhere(contents, { route : _.toArray(stateParams).join('/') });

                                                if (!ctn)
                                                    _.each(contents, function (content) {
                                                        var subCtn = undefined;
                                                        if (content.children) subCtn = setContent(content.children);
                                                        if (subCtn) ctn = subCtn;
                                                    });

                                                return ctn;
                                            }
                                            root.resource.$promise.then(function (resource) {
                                                scope.content = setContent(resource.content);
                                                scope.navigation = scope.content && scope.content.children ? scope.content.children : undefined;
                                            });
                                        }
                                    ]
                                }
                            }
                        });
                    });
                    
                    stateProvider.state('error', {
                        url : '/:error',
                        templateUrl : function (state) {
                            return 'partial/error.html';
                        },
                        controller : [
                            '$rootScope', '$scope', '$state', '$stateParams',
                            function (root, scope, state, stateParams) {
                                debugger
                            }
                        ]
                    });

                    urlRouterProvider.otherwise(function(){
                        return route.index;
                    });
                }
            ]);
    }
)(kicl);
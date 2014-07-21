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
                                        var page = function (idx) { return state[routes[idx]] ? routes[idx] : page(idx - 1); },
                                            route = _.toArray(state),
                                            template = {
                                                view : 'view/' + state.section + '/' + page(routes.length - 1),
                                                error : 'partial/error'
                                            };

                                        return 'view/' + state.section + '/' + page(routes.length - 1) + '.html';
                                    },
                                    resolve : {
                                        'content' : ['$rootScope', '$state', '$stateParams',
                                            function (root, state, stateParams) {
                                                var setContent = function (contents) {
                                                    var ctn = _.findWhere(contents, { route : _.toArray(stateParams).join('/') }) || undefined,
                                                        subCtn = undefined;

                                                    if (!ctn)
                                                        _.each(contents, function (content) {
                                                            if (content.children) subCtn = setContent(content.children);
                                                            if (subCtn) ctn = subCtn;
                                                        });

                                                    return ctn;
                                                };

                                                return root.resource.$promise.then(function (resource) {
                                                    return setContent(resource.content);
                                                });
                                            }
                                        ]
                                    },
                                    controller : [
                                        '$rootScope', '$scope', '$state', '$stateParams', 'content',
                                        function (root, scope, state, stateParams, content) {
                                            root.resource.$promise.then(function (resource) {
                                                if (content) {
                                                    scope.content = content;
                                                    if (content.children) scope.navigation = content.children;
                                                }
                                            });
                                        }
                                    ]
                                }
                            }
                        });
                    });

                    urlRouterProvider.otherwise(function(){
                        return route.index;
                    });
                }
            ]);
    }
)(kicl);
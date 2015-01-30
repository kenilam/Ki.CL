(
    function (app) {
        'use strict';
        
        app
            .controller('configRouter', [
                '$rootScope', '$scope', '$state', '$stateParams', 'content',
                function (root, scope, state, stateParams, content) {
                    scope.content = content;
                    
                    if (content && content.children) {
                        scope.navigation = content.children;
                    }

                    root.ref.route = _.values(stateParams).join('.');
                }
            ])
            .config([
                '$locationProvider',
                '$stateProvider',
                '$urlRouterProvider',
                'config',
                function (location, stateProvider, urlRouterProvider, config) {
                    var route = config.route,
                        map = route.map,
                        routes = _.rest(map.split('/:'));

                    location.hashPrefix('!');

                    _.each(routes, function (route, key) {
                        stateProvider.state(routes.slice(0, key + 1).join('.'), {
                            url : '/:' + route,
                            views : {
                                'view' : {
                                    templateUrl : function (state) {
                                        var page = function (idx) { return state[routes[idx]] ? routes[idx] : page(idx - 1); };

                                        return 'view/' + state.section + '/' + page(routes.length - 1) + '.html';
                                    },
                                    resolve : {
                                        'content' : ['$rootScope', '$state', '$stateParams',
                                            function (root, state, stateParams) {
                                                var setContent = function (contents) {
                                                    var ctn = _.findWhere(contents, { route : _.toArray(stateParams).join('/') }),
                                                        subCtn;

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
                                    controller : 'configRouter'
                                }
                            }
                        });
                    });

                    urlRouterProvider.otherwise(function(){
                        return route.index;
                    });
                }
            ]
        );
    }
)(kicl);
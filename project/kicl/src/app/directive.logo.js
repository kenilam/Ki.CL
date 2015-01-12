(
    function (app) {
        'use strict';
        
        app
            .service('logo_link',
                [
                    '$rootScope',
                    'config',
                    function (root, config) {
                        return function (scope, elm) {
                            root.resource.$promise.then(function (resource) {
                                var route = _.first(_.rest(config.route.map.split('/:'))),
                                    obj = {};

                                obj[route] = '';
                                
                                scope.logo = {
                                    name : resource.info.name + ' | ' + config.route.index,
                                    route : route + '({' + route + ':"' + config.route.index + '"})'
                                };
                            });
                        };
                    }
                ]
            )
            .directive('logo',
                [
                    'logo_link',
                    function (link) {
                        return {
                            restrict: 'AE',
                            replace: true,
                            templateUrl: 'partial/logo.html',
                            link : link
                        };
                    }
                ]
            );
    }
)(kicl);

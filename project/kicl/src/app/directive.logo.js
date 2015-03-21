(
    function init (app) {
        'use strict';
        
        app
            .service('logo_link',
                [
                    '$rootScope', 'config',
                    function link (root, config) {
                        return function trigger (scope, elm) {
                            root.resource.$promise.then(function promise (resource) {
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
                    function directive (link) {
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
